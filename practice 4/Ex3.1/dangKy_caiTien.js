$(document).ready(function () {

    $.validator.addMethod("validatePassword", function (value, element) {
        return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/.test(value);
    });

    $("#demoForm").validate({

        onfocusout: false,
        onkeyup: false,
        onclick: false,

        errorPlacement: function(error, element) {

            if (element.attr("name") === "gender") {
                error.insertAfter(".gender .field-controls");
            }

            else if (element.attr("name") === "terms") {
                error.insertAfter(".terms .field-controls");
            }

            else if (element.attr("name") === "password") {
                error.insertAfter("#strengthText");
            }

            else {
                error.insertAfter(element);
            }

        },

        rules: {

            fullName: {
                required: true,
                maxlength: 50
            },

            user: {
                required: true,
                email: true
            },

            phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            },

            password: {
                required: true,
                validatePassword: true
            },

            "re-password": {
                required: true,
                equalTo: "#password"
            },

            gender: {
                required: true
            },

            terms: {
                required: true
            }

        },

        messages: {

            fullName: {
                required: "Bắt buộc nhập họ tên",
                maxlength: "Họ tên tối đa 50 ký tự"
            },

            user: {
                required: "Bắt buộc nhập email",
                email: "Email không đúng định dạng"
            },

            phone: {
                required: "Bắt buộc nhập số điện thoại",
                digits: "Chỉ được nhập số",
                minlength: "Số điện thoại phải đủ 10 số",
                maxlength: "Số điện thoại phải đủ 10 số"
            },

            password: {
                required: "Bắt buộc nhập mật khẩu",
                validatePassword: "Mật khẩu phải có chữ hoa, chữ thường và số (8-16 ký tự)"
            },

            "re-password": {
                required: "Bắt buộc nhập lại mật khẩu",
                equalTo: "Hai mật khẩu phải giống nhau"
            },

            gender: {
                required: "Vui lòng chọn giới tính"
            },

            terms: {
                required: "Vui lòng đồng ý điều khoản"
            }

        }

    });


    $("#fullName").on("input", function () {

        let length = $(this).val().length;

        $("#charCount").text(length + "/50");

    });


    $("#togglePass").click(function () {

        let input = $("#password");

        if (input.attr("type") === "password") {
            input.attr("type", "text");
        }
        else {
            input.attr("type", "password");
        }

    });


    $("#password").on("keyup", function () {

        let val = $(this).val();

        let strength = 0;

        if (val.length >= 8) strength++;
        if (/[A-Z]/.test(val)) strength++;
        if (/[a-z]/.test(val)) strength++;
        if (/[0-9]/.test(val)) strength++;
        if (/[^A-Za-z0-9]/.test(val)) strength++;

        let bar = $("#strength");
        let text = $("#strengthText");

        if (strength <= 2) {

            bar.css({
                width: "33%",
                background: "red"
            });

            text.text("Yếu");

        }

        else if (strength <= 4) {

            bar.css({
                width: "66%",
                background: "orange"
            });

            text.text("Trung bình");

        }

        else {

            bar.css({
                width: "100%",
                background: "green"
            });

            text.text("Mạnh");

        }

    });

});