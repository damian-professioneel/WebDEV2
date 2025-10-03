var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Class definities
var TrainingData = /** @class */ (function () {
    function TrainingData(trainingName, trainingDate, trainingTime, trainingField, maxParticipants) {
        if (trainingName === void 0) { trainingName = ''; }
        if (trainingDate === void 0) { trainingDate = ''; }
        if (trainingTime === void 0) { trainingTime = ''; }
        if (trainingField === void 0) { trainingField = ''; }
        if (maxParticipants === void 0) { maxParticipants = ''; }
        this.trainingName = trainingName;
        this.trainingDate = trainingDate;
        this.trainingTime = trainingTime;
        this.trainingField = trainingField;
        this.maxParticipants = maxParticipants;
    }
    TrainingData.prototype.isValid = function () {
        return !!(this.trainingName && this.trainingDate && this.trainingTime &&
            this.trainingField && this.maxParticipants);
    };
    return TrainingData;
}());
var AttendanceData = /** @class */ (function () {
    function AttendanceData() {
        this.data = {};
    }
    AttendanceData.prototype.setAttendance = function (memberName, status) {
        this.data[memberName] = status;
    };
    AttendanceData.prototype.getAttendance = function (memberName) {
        return this.data[memberName] || 'Onbekend';
    };
    AttendanceData.prototype.getAllAttendance = function () {
        return __assign({}, this.data);
    };
    return AttendanceData;
}());
// Generic Utility Classes
var DOMHelper = /** @class */ (function () {
    function DOMHelper() {
    }
    DOMHelper.getElement = function (selector) {
        return document.querySelector(selector);
    };
    DOMHelper.getElementById = function (id) {
        return document.getElementById(id);
    };
    DOMHelper.createElement = function (tag, className) {
        var element = document.createElement(tag);
        if (className)
            element.className = className;
        return element;
    };
    DOMHelper.scrollToElement = function (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    };
    return DOMHelper;
}());
var FormValidator = /** @class */ (function () {
    function FormValidator() {
    }
    FormValidator.validateFields = function (fieldConfigs) {
        var _a;
        var errors = [];
        for (var _i = 0, fieldConfigs_1 = fieldConfigs; _i < fieldConfigs_1.length; _i++) {
            var config = fieldConfigs_1[_i];
            var element = DOMHelper.getElementById(config.id);
            var value = ((_a = element === null || element === void 0 ? void 0 : element.value) === null || _a === void 0 ? void 0 : _a.trim()) || '';
            if (!config.validator(value)) {
                errors.push(config.errorMessage);
                if (element) {
                    element.style.borderColor = 'red';
                }
            }
            else if (element) {
                element.style.borderColor = '';
            }
        }
        return { isValid: errors.length === 0, errors: errors };
    };
    FormValidator.emailValidator = function (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    FormValidator.requiredValidator = function (value) {
        return value.length > 0;
    };
    FormValidator.numberValidator = function (value) {
        return /^[0-9]+$/.test(value) && parseInt(value) > 0;
    };
    return FormValidator;
}());
var NotificationHelper = /** @class */ (function () {
    function NotificationHelper() {
    }
    NotificationHelper.showSuccess = function (message) {
        alert("\u2705 ".concat(message));
    };
    NotificationHelper.showError = function (message) {
        alert("\u274C ".concat(message));
    };
    NotificationHelper.showConfirmation = function (message, data) {
        if (data) {
            alert("".concat(message, "\n\n").concat(this.formatData(data)));
        }
        else {
            alert(message);
        }
    };
    NotificationHelper.confirm = function (message) {
        return confirm("\u26A0\uFE0F ".concat(message));
    };
    NotificationHelper.formatData = function (data) {
        return Object.entries(data)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return "".concat(key, ": ").concat(value);
        })
            .join('\n');
    };
    return NotificationHelper;
}());
var DateHelper = /** @class */ (function () {
    function DateHelper() {
    }
    DateHelper.formatDate = function (dateString) {
        var date = new Date(dateString);
        return date.toLocaleDateString('nl-NL');
    };
    DateHelper.getCurrentTimestamp = function () {
        return Date.now();
    };
    return DateHelper;
}());
var TrainingManager = /** @class */ (function () {
    function TrainingManager() {
    }
    TrainingManager.addTrainingToList = function (trainingData) {
        var trainingsContainer = DOMHelper.getElement('.trainings-container');
        if (!trainingsContainer)
            return;
        var uniqueId = DateHelper.getCurrentTimestamp();
        var trainingCard = this.createTrainingCard(trainingData, uniqueId);
        trainingsContainer.appendChild(trainingCard);
        DOMHelper.scrollToElement(trainingCard);
    };
    TrainingManager.createTrainingCard = function (trainingData, uniqueId) {
        var trainingCard = DOMHelper.createElement('div', 'training-card');
        trainingCard.innerHTML = "\n            <h3>".concat(trainingData.trainingName, "</h3>\n            <p><strong>Datum:</strong> ").concat(DateHelper.formatDate(trainingData.trainingDate), "</p>\n            <p><strong>Tijd:</strong> ").concat(trainingData.trainingTime, "</p>\n            <p><strong>Veld:</strong> ").concat(trainingData.trainingField, "</p>\n            <p><strong>Deelnemers:</strong> 0/").concat(trainingData.maxParticipants, " (").concat(trainingData.maxParticipants, " plekken beschikbaar)</p>\n            \n            <div class=\"training-actions\">\n                <details class=\"enrollment-details\">\n                    <summary class=\"btn-secondary\">Inschrijvingen Beheren</summary>\n                    <div class=\"enrollment-content\">\n                        <h4>Beschikbare leden:</h4>\n                        <form class=\"enrollment-form\" onsubmit=\"EnrollmentHandler.handle(event, ").concat(uniqueId, ")\">\n                            ").concat(this.createMemberCheckboxes(uniqueId), "\n                            <button type=\"submit\" class=\"btn-primary btn-small\">Wijzigingen Opslaan</button>\n                        </form>\n                    </div>\n                </details>\n                \n                <details class=\"attendance-details\">\n                    <summary class=\"btn-secondary\">Aanwezigheid Bijhouden</summary>\n                    <div class=\"attendance-content\" id=\"attendance-").concat(uniqueId, "\">\n                        <h4>Ingeschreven leden:</h4>\n                        <p>Nog geen ingeschreven leden.</p>\n                    </div>\n                </details>\n                \n                <button class=\"btn-danger\" onclick=\"TrainingManager.remove(this)\">Training Verwijderen</button>\n            </div>\n            \n            <div class=\"enrolled-members\" id=\"enrolled-").concat(uniqueId, "\">\n                <h4>Ingeschreven leden:</h4>\n                <p>Nog geen ingeschreven leden.</p>\n            </div>\n        ");
        return trainingCard;
    };
    TrainingManager.createMemberCheckboxes = function (uniqueId) {
        var members = ['Jan de Vries', 'Marie Janssen', 'Piet Bakker', 'Lisa de Jong'];
        return members.map(function (member, index) { return "\n            <div class=\"checkbox-group\">\n                <input type=\"checkbox\" id=\"member".concat(index + 1, "-").concat(uniqueId, "\" name=\"enrollment\" value=\"").concat(member, "\">\n                <label for=\"member").concat(index + 1, "-").concat(uniqueId, "\">").concat(member, "</label>\n            </div>\n        "); }).join('');
    };
    TrainingManager.remove = function (button) {
        if (NotificationHelper.confirm('Weet je zeker dat je deze training wilt verwijderen?')) {
            var trainingCard = button.closest('.training-card');
            var trainingNameElement = trainingCard === null || trainingCard === void 0 ? void 0 : trainingCard.querySelector('h3');
            var trainingName = (trainingNameElement === null || trainingNameElement === void 0 ? void 0 : trainingNameElement.textContent) || 'Onbekende training';
            trainingCard === null || trainingCard === void 0 ? void 0 : trainingCard.remove();
            NotificationHelper.showSuccess("Training \"".concat(trainingName, "\" succesvol verwijderd!"));
        }
    };
    return TrainingManager;
}());
var MemberManager = /** @class */ (function () {
    function MemberManager() {
    }
    MemberManager.addMemberToList = function (name, email) {
        var membersGrid = DOMHelper.getElement('.members-grid');
        if (!membersGrid)
            return;
        var memberCard = this.createMemberCard(name, email);
        membersGrid.appendChild(memberCard);
        DOMHelper.scrollToElement(memberCard);
    };
    MemberManager.createMemberCard = function (name, email) {
        var memberCard = DOMHelper.createElement('div', 'member-card');
        memberCard.innerHTML = "\n            <h4>".concat(name, "</h4>\n            <p>").concat(email, "</p>\n            <button class=\"btn-danger btn-small\" onclick=\"MemberManager.remove(this)\">Verwijderen</button>\n        ");
        return memberCard;
    };
    MemberManager.remove = function (button) {
        if (NotificationHelper.confirm('Weet je zeker dat je dit lid wilt verwijderen?')) {
            var memberCard = button.closest('.member-card');
            var memberNameElement = memberCard === null || memberCard === void 0 ? void 0 : memberCard.querySelector('h4');
            var memberName = (memberNameElement === null || memberNameElement === void 0 ? void 0 : memberNameElement.textContent) || 'Onbekend lid';
            memberCard === null || memberCard === void 0 ? void 0 : memberCard.remove();
            NotificationHelper.showSuccess("Lid \"".concat(memberName, "\" succesvol verwijderd!"));
        }
    };
    return MemberManager;
}());
var EnrollmentHandler = /** @class */ (function () {
    function EnrollmentHandler() {
    }
    EnrollmentHandler.handle = function (event, uniqueId) {
        event.preventDefault();
        var form = event.target;
        var checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        var enrolledMembers = Array.from(checkboxes).map(function (cb) { return cb.value; });
        if (enrolledMembers.length === 0) {
            NotificationHelper.showError('Selecteer ten minste één lid om in te schrijven.');
            return;
        }
        this.updateEnrolledMembersList(uniqueId, enrolledMembers);
        this.updateAttendanceSection(uniqueId, enrolledMembers);
        NotificationHelper.showSuccess("".concat(enrolledMembers.length, " leden succesvol ingeschreven!"));
    };
    EnrollmentHandler.updateEnrolledMembersList = function (uniqueId, members) {
        var enrolledDiv = DOMHelper.getElementById("enrolled-".concat(uniqueId));
        if (enrolledDiv) {
            enrolledDiv.innerHTML = "\n                <h4>Ingeschreven leden:</h4>\n                <ul class=\"enrolled-list\">\n                    ".concat(members.map(function (member) { return "<li>".concat(member, " - \u2753 Onbekend</li>"); }).join(''), "\n                </ul>\n            ");
        }
    };
    EnrollmentHandler.updateAttendanceSection = function (uniqueId, members) {
        var _this = this;
        var attendanceDiv = DOMHelper.getElementById("attendance-".concat(uniqueId));
        if (attendanceDiv) {
            attendanceDiv.innerHTML = "\n                <h4>Ingeschreven leden:</h4>\n                <form class=\"attendance-form\" onsubmit=\"AttendanceHandler.handle(event, ".concat(uniqueId, ")\">\n                    ").concat(members.map(function (member, index) { return _this.createAttendanceItem(member, uniqueId, index); }).join(''), "\n                    <button type=\"submit\" class=\"btn-primary btn-small\">Aanwezigheid Opslaan</button>\n                </form>\n            ");
        }
    };
    EnrollmentHandler.createAttendanceItem = function (member, uniqueId, index) {
        return "\n            <div class=\"attendance-item\">\n                <span>".concat(member, "</span>\n                <div class=\"attendance-buttons\">\n                    <input type=\"radio\" id=\"present-").concat(uniqueId, "-").concat(index, "\" name=\"attendance-").concat(index, "\" value=\"present\">\n                    <label for=\"present-").concat(uniqueId, "-").concat(index, "\" class=\"btn-small btn-success\">Aanwezig</label>\n                    <input type=\"radio\" id=\"absent-").concat(uniqueId, "-").concat(index, "\" name=\"attendance-").concat(index, "\" value=\"absent\">\n                    <label for=\"absent-").concat(uniqueId, "-").concat(index, "\" class=\"btn-small btn-danger\">Afwezig</label>\n                </div>\n            </div>\n        ");
    };
    return EnrollmentHandler;
}());
var AttendanceHandler = /** @class */ (function () {
    function AttendanceHandler() {
    }
    AttendanceHandler.handle = function (event, uniqueId) {
        event.preventDefault();
        var form = event.target;
        var attendanceInputs = form.querySelectorAll('input[type="radio"]:checked');
        var attendanceData = new AttendanceData();
        attendanceInputs.forEach(function (input) {
            var attendanceItem = input.closest('.attendance-item');
            var memberSpan = attendanceItem === null || attendanceItem === void 0 ? void 0 : attendanceItem.querySelector('span');
            if (memberSpan) {
                var memberName = memberSpan.textContent || '';
                var status_1 = input.value === 'present' ? 'Aanwezig' : 'Afwezig';
                attendanceData.setAttendance(memberName, status_1);
            }
        });
        this.updateEnrolledMembersWithAttendance(uniqueId, form, attendanceData);
        NotificationHelper.showSuccess('Aanwezigheid succesvol opgeslagen!');
    };
    AttendanceHandler.updateEnrolledMembersWithAttendance = function (uniqueId, form, attendanceData) {
        var enrolledDiv = DOMHelper.getElementById("enrolled-".concat(uniqueId));
        if (enrolledDiv) {
            var attendanceItems = form.querySelectorAll('.attendance-item');
            var membersList = Array.from(attendanceItems).map(function (item) {
                var memberSpan = item.querySelector('span');
                var memberName = (memberSpan === null || memberSpan === void 0 ? void 0 : memberSpan.textContent) || '';
                var status = attendanceData.getAttendance(memberName);
                var emoji = status === 'Aanwezig' ? '✅' : status === 'Afwezig' ? '❌' : '❓';
                return "<li>".concat(memberName, " - ").concat(emoji, " ").concat(status, "</li>");
            });
            enrolledDiv.innerHTML = "\n                <h4>Ingeschreven leden:</h4>\n                <ul class=\"enrolled-list\">\n                    ".concat(membersList.join(''), "\n                </ul>\n            ");
        }
    };
    return AttendanceHandler;
}());
// Generic Form Handler Class
var FormHandler = /** @class */ (function () {
    function FormHandler(formSelector, validator, onSuccess) {
        this.formSelector = formSelector;
        this.validator = validator;
        this.onSuccess = onSuccess;
        this.initialize();
    }
    FormHandler.prototype.initialize = function () {
        var _this = this;
        document.addEventListener('DOMContentLoaded', function () {
            var form = DOMHelper.getElement(_this.formSelector);
            if (form) {
                form.addEventListener('submit', function (e) { return _this.handleSubmit(e, form); });
            }
        });
    };
    FormHandler.prototype.handleSubmit = function (event, form) {
        event.preventDefault();
        var data = this.extractFormData(form);
        var validation = this.validator(data);
        if (validation.isValid) {
            this.onSuccess(data, form);
            form.reset();
        }
        else {
            NotificationHelper.showError("Validatie fouten:\n".concat(validation.errors.join('\n')));
        }
    };
    FormHandler.prototype.extractFormData = function (form) {
        // This should be overridden by specific implementations
        throw new Error('extractFormData must be implemented by subclass');
    };
    return FormHandler;
}());
// Training Form Handler
var TrainingFormHandler = /** @class */ (function (_super) {
    __extends(TrainingFormHandler, _super);
    function TrainingFormHandler() {
        var _this = _super.call(this, '.training-form', function (data) { return _this.validateTrainingData(data); }, function (data, form) { return _this.onTrainingSuccess(data, form); }) || this;
        return _this;
    }
    TrainingFormHandler.prototype.extractFormData = function (form) {
        var _a, _b, _c, _d, _e;
        return new TrainingData(((_a = DOMHelper.getElementById('trainingName')) === null || _a === void 0 ? void 0 : _a.value) || '', ((_b = DOMHelper.getElementById('trainingDate')) === null || _b === void 0 ? void 0 : _b.value) || '', ((_c = DOMHelper.getElementById('trainingTime')) === null || _c === void 0 ? void 0 : _c.value) || '', ((_d = DOMHelper.getElementById('trainingField')) === null || _d === void 0 ? void 0 : _d.value) || '', ((_e = DOMHelper.getElementById('maxParticipants')) === null || _e === void 0 ? void 0 : _e.value) || '');
    };
    TrainingFormHandler.prototype.validateTrainingData = function (data) {
        var fieldConfigs = [
            { id: 'trainingName', validator: FormValidator.requiredValidator, errorMessage: 'Training naam is verplicht' },
            { id: 'trainingDate', validator: FormValidator.requiredValidator, errorMessage: 'Datum is verplicht' },
            { id: 'trainingTime', validator: FormValidator.requiredValidator, errorMessage: 'Tijd is verplicht' },
            { id: 'trainingField', validator: FormValidator.requiredValidator, errorMessage: 'Veld is verplicht' },
            { id: 'maxParticipants', validator: FormValidator.numberValidator, errorMessage: 'Max deelnemers moet een geldig getal zijn' }
        ];
        return FormValidator.validateFields(fieldConfigs);
    };
    TrainingFormHandler.prototype.onTrainingSuccess = function (data, form) {
        var confirmationData = {
            'Datum': DateHelper.formatDate(data.trainingDate),
            'Tijd': data.trainingTime,
            'Veld': data.trainingField,
            'Max deelnemers': data.maxParticipants
        };
        NotificationHelper.showConfirmation("Training \"".concat(data.trainingName, "\" succesvol toegevoegd!"), confirmationData);
        TrainingManager.addTrainingToList(data);
    };
    return TrainingFormHandler;
}(FormHandler));
// Member Form Handler
var MemberFormHandler = /** @class */ (function (_super) {
    __extends(MemberFormHandler, _super);
    function MemberFormHandler() {
        var _this = _super.call(this, '.member-form', function (data) { return _this.validateMemberData(data); }, function (data, form) { return _this.onMemberSuccess(data, form); }) || this;
        return _this;
    }
    MemberFormHandler.prototype.extractFormData = function (form) {
        var _a, _b;
        return {
            name: ((_a = DOMHelper.getElementById('memberName')) === null || _a === void 0 ? void 0 : _a.value) || '',
            email: ((_b = DOMHelper.getElementById('memberEmail')) === null || _b === void 0 ? void 0 : _b.value) || ''
        };
    };
    MemberFormHandler.prototype.validateMemberData = function (data) {
        var fieldConfigs = [
            { id: 'memberName', validator: FormValidator.requiredValidator, errorMessage: 'Naam is verplicht' },
            { id: 'memberEmail', validator: FormValidator.emailValidator, errorMessage: 'Geldig email adres is verplicht' }
        ];
        return FormValidator.validateFields(fieldConfigs);
    };
    MemberFormHandler.prototype.onMemberSuccess = function (data, form) {
        NotificationHelper.showSuccess("Lid \"".concat(data.name, "\" succesvol toegevoegd!"));
        MemberManager.addMemberToList(data.name, data.email);
    };
    return MemberFormHandler;
}(FormHandler));
// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    // Initialize form handlers
    new TrainingFormHandler();
    new MemberFormHandler();
    // Add event listeners to existing delete buttons
    var existingDeleteButtons = document.querySelectorAll('.member-card .btn-danger');
    existingDeleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            MemberManager.remove(this);
        });
    });
});
// Make functions globally available for onclick handlers
window.EnrollmentHandler = EnrollmentHandler;
window.AttendanceHandler = AttendanceHandler;
window.TrainingManager = TrainingManager;
window.MemberManager = MemberManager;
