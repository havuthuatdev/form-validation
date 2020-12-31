// hàm validator
function Validator(options) {
    // console.log(options.form);
    var formElement = document.querySelector(options.form);
    // console.log(options.rules);
    if (formElement) {
        options.rules.forEach(function (rule) {
            // console.log(rule.selector);
            // gọi ô input 
            var inputElement = formElement.querySelector(rule.selector);
            // console.log(inputElement);

            if (inputElement) {
                inputElement.onblur = function () {
                    var errormessage = rule.test(inputElement.value);
                    var errorElement = inputElement.parentElement.querySelector("#error-message");
                    // console.log(errormessage)
                    if (errormessage) {
                        errorElement.innerHTML = errormessage;
                        // console.log(inputElement.parentElement.querySelector("#error-message"));
                    } else {
                        errorElement.innerHTML = " ";
                        // formElement.querySelector(rule.selector).classList.remove("form-message");

                    }
                    // console.log(inputElement.value);
                }
            }

        });
    }
}
// định nghĩa các rules
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            // nguyên tắc của các rule.
            // 1. khi có lỗi trả ra message lỗi.
            // 2. không có lỗi thì k trả lại gì cả.
            // trim() => loại bỏ các trường hợp nhập toàn dấu cách
            return value.trim() ? undefined : "Vui lòng nhập trường này";

        }
    }
}
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value) ? undefined : "Trường này phải là Email";

        }
    }
}
Validator.isPassword = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Mật khẩu ít nhất ${min} ký tự`;

        }
    }
}
Validator.isConfirmed = function (selector, getConfirmValue) {
    return {
        selector: selector,
        test: function (value) {
            return value == getConfirmValue() ? undefined : "Giá trị nhập vào không chính xác";

        }
    }
}