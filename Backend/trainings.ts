// Generic Types
type AttendanceStatus = 'Aanwezig' | 'Afwezig' | 'Onbekend';
type FormFieldConfig = {
    id: string;
    validator: (value: string) => boolean;
    errorMessage: string;
};

// Class definities
class TrainingData {
    trainingName: string;
    trainingDate: string;
    trainingTime: string;
    trainingField: string;
    maxParticipants: string;

    constructor(
        trainingName: string = '',
        trainingDate: string = '',
        trainingTime: string = '',
        trainingField: string = '',
        maxParticipants: string = ''
    ) {
        this.trainingName = trainingName;
        this.trainingDate = trainingDate;
        this.trainingTime = trainingTime;
        this.trainingField = trainingField;
        this.maxParticipants = maxParticipants;
    }

    isValid(): boolean {
        return !!(this.trainingName && this.trainingDate && this.trainingTime && 
                 this.trainingField && this.maxParticipants);
    }
}

class AttendanceData {
    private data: { [memberName: string]: Exclude<AttendanceStatus, 'Onbekend'> } = {};

    setAttendance(memberName: string, status: Exclude<AttendanceStatus, 'Onbekend'>): void {
        this.data[memberName] = status;
    }

    getAttendance(memberName: string): AttendanceStatus {
        return this.data[memberName] || 'Onbekend';
    }

    getAllAttendance(): { [memberName: string]: Exclude<AttendanceStatus, 'Onbekend'> } {
        return { ...this.data };
    }
}

// Generic Utility Classes
class DOMHelper {
    static getElement(selector: string): HTMLElement | null {
        return document.querySelector(selector);
    }

    static getElementById(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    static createElement(tag: string, className?: string): HTMLElement {
        const element = document.createElement(tag);
        if (className) element.className = className;
        return element;
    }

    static scrollToElement(element: HTMLElement): void {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

class FormValidator {
    static validateFields(fieldConfigs: FormFieldConfig[]): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];
        
        for (const config of fieldConfigs) {
            const element = DOMHelper.getElementById(config.id) as HTMLInputElement | HTMLSelectElement;
            const value = element?.value?.trim() || '';
            
            if (!config.validator(value)) {
                errors.push(config.errorMessage);
                if (element) {
                    element.style.borderColor = 'red';
                }
            } else if (element) {
                element.style.borderColor = '';
            }
        }

        return { isValid: errors.length === 0, errors };
    }

    static emailValidator = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    static requiredValidator = (value: string): boolean => {
        return value.length > 0;
    };

    static numberValidator = (value: string): boolean => {
        return /^[0-9]+$/.test(value) && parseInt(value) > 0;
    };
}

class NotificationHelper {
    static showSuccess(message: string): void {
        alert(`✅ ${message}`);
    }

    static showError(message: string): void {
        alert(`❌ ${message}`);
    }

    static showConfirmation(message: string, data?: any): void {
        if (data) {
            alert(`${message}\n\n${this.formatData(data)}`);
        } else {
            alert(message);
        }
    }

    static confirm(message: string): boolean {
        return confirm(`⚠️ ${message}`);
    }

    private static formatData(data: any): string {
        return Object.entries(data)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
    }
}

class DateHelper {
    static formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('nl-NL');
    }

    static getCurrentTimestamp(): number {
        return Date.now();
    }
}

class TrainingManager {
    static addTrainingToList(trainingData: TrainingData): void {
        const trainingsContainer = DOMHelper.getElement('.trainings-container') as HTMLDivElement;
        if (!trainingsContainer) return;
        
        const uniqueId = DateHelper.getCurrentTimestamp();
        const trainingCard = this.createTrainingCard(trainingData, uniqueId);
        
        trainingsContainer.appendChild(trainingCard);
        DOMHelper.scrollToElement(trainingCard);
    }

    private static createTrainingCard(trainingData: TrainingData, uniqueId: number): HTMLDivElement {
        const trainingCard = DOMHelper.createElement('div', 'training-card') as HTMLDivElement;
        trainingCard.innerHTML = `
            <h3>${trainingData.trainingName}</h3>
            <p><strong>Datum:</strong> ${DateHelper.formatDate(trainingData.trainingDate)}</p>
            <p><strong>Tijd:</strong> ${trainingData.trainingTime}</p>
            <p><strong>Veld:</strong> ${trainingData.trainingField}</p>
            <p><strong>Deelnemers:</strong> 0/${trainingData.maxParticipants} (${trainingData.maxParticipants} plekken beschikbaar)</p>
            
            <div class="training-actions">
                <details class="enrollment-details">
                    <summary class="btn-secondary">Inschrijvingen Beheren</summary>
                    <div class="enrollment-content">
                        <h4>Beschikbare leden:</h4>
                        <form class="enrollment-form" onsubmit="EnrollmentHandler.handle(event, ${uniqueId})">
                            ${this.createMemberCheckboxes(uniqueId)}
                            <button type="submit" class="btn-primary btn-small">Wijzigingen Opslaan</button>
                        </form>
                    </div>
                </details>
                
                <details class="attendance-details">
                    <summary class="btn-secondary">Aanwezigheid Bijhouden</summary>
                    <div class="attendance-content" id="attendance-${uniqueId}">
                        <h4>Ingeschreven leden:</h4>
                        <p>Nog geen ingeschreven leden.</p>
                    </div>
                </details>
                
                <button class="btn-danger" onclick="TrainingManager.remove(this)">Training Verwijderen</button>
            </div>
            
            <div class="enrolled-members" id="enrolled-${uniqueId}">
                <h4>Ingeschreven leden:</h4>
                <p>Nog geen ingeschreven leden.</p>
            </div>
        `;
        return trainingCard;
    }

    private static createMemberCheckboxes(uniqueId: number): string {
        const members = ['Jan de Vries', 'Marie Janssen', 'Piet Bakker', 'Lisa de Jong'];
        return members.map((member, index) => `
            <div class="checkbox-group">
                <input type="checkbox" id="member${index + 1}-${uniqueId}" name="enrollment" value="${member}">
                <label for="member${index + 1}-${uniqueId}">${member}</label>
            </div>
        `).join('');
    }

    static remove(button: HTMLButtonElement): void {
        if (NotificationHelper.confirm('Weet je zeker dat je deze training wilt verwijderen?')) {
            const trainingCard = button.closest('.training-card') as HTMLElement;
            const trainingNameElement = trainingCard?.querySelector('h3');
            const trainingName = trainingNameElement?.textContent || 'Onbekende training';
            trainingCard?.remove();
            NotificationHelper.showSuccess(`Training "${trainingName}" succesvol verwijderd!`);
        }
    }
}

class MemberManager {
    static addMemberToList(name: string, email: string): void {
        const membersGrid = DOMHelper.getElement('.members-grid') as HTMLDivElement;
        if (!membersGrid) return;
        
        const memberCard = this.createMemberCard(name, email);
        membersGrid.appendChild(memberCard);
        DOMHelper.scrollToElement(memberCard);
    }

    private static createMemberCard(name: string, email: string): HTMLDivElement {
        const memberCard = DOMHelper.createElement('div', 'member-card') as HTMLDivElement;
        memberCard.innerHTML = `
            <h4>${name}</h4>
            <p>${email}</p>
            <button class="btn-danger btn-small" onclick="MemberManager.remove(this)">Verwijderen</button>
        `;
        return memberCard;
    }

    static remove(button: HTMLButtonElement): void {
        if (NotificationHelper.confirm('Weet je zeker dat je dit lid wilt verwijderen?')) {
            const memberCard = button.closest('.member-card') as HTMLElement;
            const memberNameElement = memberCard?.querySelector('h4');
            const memberName = memberNameElement?.textContent || 'Onbekend lid';
            memberCard?.remove();
            NotificationHelper.showSuccess(`Lid "${memberName}" succesvol verwijderd!`);
        }
    }
}

class EnrollmentHandler {
    static handle(event: Event, uniqueId: number): void {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const checkboxes = form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');
        const enrolledMembers = Array.from(checkboxes).map(cb => cb.value);
        
        if (enrolledMembers.length === 0) {
            NotificationHelper.showError('Selecteer ten minste één lid om in te schrijven.');
            return;
        }
        
        this.updateEnrolledMembersList(uniqueId, enrolledMembers);
        this.updateAttendanceSection(uniqueId, enrolledMembers);
        
        NotificationHelper.showSuccess(`${enrolledMembers.length} leden succesvol ingeschreven!`);
    }

    private static updateEnrolledMembersList(uniqueId: number, members: string[]): void {
        const enrolledDiv = DOMHelper.getElementById(`enrolled-${uniqueId}`) as HTMLDivElement;
        if (enrolledDiv) {
            enrolledDiv.innerHTML = `
                <h4>Ingeschreven leden:</h4>
                <ul class="enrolled-list">
                    ${members.map(member => `<li>${member} - ❓ Onbekend</li>`).join('')}
                </ul>
            `;
        }
    }

    private static updateAttendanceSection(uniqueId: number, members: string[]): void {
        const attendanceDiv = DOMHelper.getElementById(`attendance-${uniqueId}`) as HTMLDivElement;
        if (attendanceDiv) {
            attendanceDiv.innerHTML = `
                <h4>Ingeschreven leden:</h4>
                <form class="attendance-form" onsubmit="AttendanceHandler.handle(event, ${uniqueId})">
                    ${members.map((member, index) => this.createAttendanceItem(member, uniqueId, index)).join('')}
                    <button type="submit" class="btn-primary btn-small">Aanwezigheid Opslaan</button>
                </form>
            `;
        }
    }

    private static createAttendanceItem(member: string, uniqueId: number, index: number): string {
        return `
            <div class="attendance-item">
                <span>${member}</span>
                <div class="attendance-buttons">
                    <input type="radio" id="present-${uniqueId}-${index}" name="attendance-${index}" value="present">
                    <label for="present-${uniqueId}-${index}" class="btn-small btn-success">Aanwezig</label>
                    <input type="radio" id="absent-${uniqueId}-${index}" name="attendance-${index}" value="absent">
                    <label for="absent-${uniqueId}-${index}" class="btn-small btn-danger">Afwezig</label>
                </div>
            </div>
        `;
    }
}

class AttendanceHandler {
    static handle(event: Event, uniqueId: number): void {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const attendanceInputs = form.querySelectorAll<HTMLInputElement>('input[type="radio"]:checked');
        const attendanceData = new AttendanceData();
        
        attendanceInputs.forEach(input => {
            const attendanceItem = input.closest('.attendance-item') as HTMLElement;
            const memberSpan = attendanceItem?.querySelector('span');
            if (memberSpan) {
                const memberName = memberSpan.textContent || '';
                const status = input.value === 'present' ? 'Aanwezig' : 'Afwezig';
                attendanceData.setAttendance(memberName, status);
            }
        });
        
        this.updateEnrolledMembersWithAttendance(uniqueId, form, attendanceData);
        NotificationHelper.showSuccess('Aanwezigheid succesvol opgeslagen!');
    }

    private static updateEnrolledMembersWithAttendance(uniqueId: number, form: HTMLFormElement, attendanceData: AttendanceData): void {
        const enrolledDiv = DOMHelper.getElementById(`enrolled-${uniqueId}`) as HTMLDivElement;
        if (enrolledDiv) {
            const attendanceItems = form.querySelectorAll<HTMLElement>('.attendance-item');
            const membersList = Array.from(attendanceItems).map(item => {
                const memberSpan = item.querySelector('span');
                const memberName = memberSpan?.textContent || '';
                const status = attendanceData.getAttendance(memberName);
                const emoji = status === 'Aanwezig' ? '✅' : status === 'Afwezig' ? '❌' : '❓';
                return `<li>${memberName} - ${emoji} ${status}</li>`;
            });
            
            enrolledDiv.innerHTML = `
                <h4>Ingeschreven leden:</h4>
                <ul class="enrolled-list">
                    ${membersList.join('')}
                </ul>
            `;
        }
    }
}

// Generic Form Handler Class
class FormHandler<T> {
    constructor(
        private formSelector: string,
        private validator: (data: T) => { isValid: boolean; errors: string[] },
        private onSuccess: (data: T, form: HTMLFormElement) => void
    ) {
        this.initialize();
    }

    private initialize(): void {
        document.addEventListener('DOMContentLoaded', () => {
            const form = DOMHelper.getElement(this.formSelector) as HTMLFormElement;
            if (form) {
                form.addEventListener('submit', (e) => this.handleSubmit(e, form));
            }
        });
    }

    private handleSubmit(event: Event, form: HTMLFormElement): void {
        event.preventDefault();
        
        const data = this.extractFormData(form);
        const validation = this.validator(data);
        
        if (validation.isValid) {
            this.onSuccess(data, form);
            form.reset();
        } else {
            NotificationHelper.showError(`Validatie fouten:\n${validation.errors.join('\n')}`);
        }
    }

    protected extractFormData(form: HTMLFormElement): T {
        // This should be overridden by specific implementations
        throw new Error('extractFormData must be implemented by subclass');
    }
}

// Training Form Handler
class TrainingFormHandler extends FormHandler<TrainingData> {
    constructor() {
        super(
            '.training-form',
            (data) => this.validateTrainingData(data),
            (data, form) => this.onTrainingSuccess(data, form)
        );
    }

    protected extractFormData(form: HTMLFormElement): TrainingData {
        return new TrainingData(
            (DOMHelper.getElementById('trainingName') as HTMLInputElement)?.value || '',
            (DOMHelper.getElementById('trainingDate') as HTMLInputElement)?.value || '',
            (DOMHelper.getElementById('trainingTime') as HTMLInputElement)?.value || '',
            (DOMHelper.getElementById('trainingField') as HTMLSelectElement)?.value || '',
            (DOMHelper.getElementById('maxParticipants') as HTMLInputElement)?.value || ''
        );
    }

    private validateTrainingData(data: TrainingData): { isValid: boolean; errors: string[] } {
        const fieldConfigs: FormFieldConfig[] = [
            { id: 'trainingName', validator: FormValidator.requiredValidator, errorMessage: 'Training naam is verplicht' },
            { id: 'trainingDate', validator: FormValidator.requiredValidator, errorMessage: 'Datum is verplicht' },
            { id: 'trainingTime', validator: FormValidator.requiredValidator, errorMessage: 'Tijd is verplicht' },
            { id: 'trainingField', validator: FormValidator.requiredValidator, errorMessage: 'Veld is verplicht' },
            { id: 'maxParticipants', validator: FormValidator.numberValidator, errorMessage: 'Max deelnemers moet een geldig getal zijn' }
        ];

        return FormValidator.validateFields(fieldConfigs);
    }

    private onTrainingSuccess(data: TrainingData, form: HTMLFormElement): void {
        const confirmationData = {
            'Datum': DateHelper.formatDate(data.trainingDate),
            'Tijd': data.trainingTime,
            'Veld': data.trainingField,
            'Max deelnemers': data.maxParticipants
        };

        NotificationHelper.showConfirmation(`Training "${data.trainingName}" succesvol toegevoegd!`, confirmationData);
        TrainingManager.addTrainingToList(data);
    }
}

// Member Form Handler
class MemberFormHandler extends FormHandler<{name: string, email: string}> {
    constructor() {
        super(
            '.member-form',
            (data) => this.validateMemberData(data),
            (data, form) => this.onMemberSuccess(data, form)
        );
    }

    protected extractFormData(form: HTMLFormElement): {name: string, email: string} {
        return {
            name: (DOMHelper.getElementById('memberName') as HTMLInputElement)?.value || '',
            email: (DOMHelper.getElementById('memberEmail') as HTMLInputElement)?.value || ''
        };
    }

    private validateMemberData(data: {name: string, email: string}): { isValid: boolean; errors: string[] } {
        const fieldConfigs: FormFieldConfig[] = [
            { id: 'memberName', validator: FormValidator.requiredValidator, errorMessage: 'Naam is verplicht' },
            { id: 'memberEmail', validator: FormValidator.emailValidator, errorMessage: 'Geldig email adres is verplicht' }
        ];

        return FormValidator.validateFields(fieldConfigs);
    }

    private onMemberSuccess(data: {name: string, email: string}, form: HTMLFormElement): void {
        NotificationHelper.showSuccess(`Lid "${data.name}" succesvol toegevoegd!`);
        MemberManager.addMemberToList(data.name, data.email);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function(): void {
    // Initialize form handlers
    new TrainingFormHandler();
    new MemberFormHandler();
    
    // Add event listeners to existing delete buttons
    const existingDeleteButtons = document.querySelectorAll<HTMLButtonElement>('.member-card .btn-danger');
    existingDeleteButtons.forEach(button => {
        button.addEventListener('click', function(): void {
            MemberManager.remove(this);
        });
    });
});

// Make functions globally available for onclick handlers
(window as any).EnrollmentHandler = EnrollmentHandler;
(window as any).AttendanceHandler = AttendanceHandler;
(window as any).TrainingManager = TrainingManager;
(window as any).MemberManager = MemberManager;