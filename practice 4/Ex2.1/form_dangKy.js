$().ready(function () {

    $.validator.addMethod("validatePassword", function (value, element) {
        return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/.test(value);
    }, "Password phải 8-16 ký tự, có chữ hoa, thường và số");

    $("#demoForm").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        errorPlacement: function(error, element) {
            if (element.attr("name") === "gender") {
                error.insertAfter(".gender .field-controls");
            } else if (element.attr("name") === "terms") {
                error.insertAfter(".terms .field-controls");
            } else {
                error.insertAfter(element);
            }
        },
        rules: {
            fullName: { required: true },
            user: { required: true, email: true, maxlength: 50 },
            phone: { required: true, digits: true, minlength: 10, maxlength: 10 },
            password: { required: true, validatePassword: true, minlength: 8 },
            "re-password": { required: true, equalTo: "#password" },
            gender: { required: true },
            terms: { required: true }
        },
        messages: {
            fullName: { required: "Bắt buộc nhập họ tên" },
            user: { required: "Bắt buộc nhập email", email: "Email không đúng định dạng" },
            phone: { required: "Bắt buộc nhập số điện thoại", digits: "Chỉ được nhập số", minlength: "Phải đủ 10 số", maxlength: "Phải 10 số" },
            password: { required: "Bắt buộc nhập mật khẩu" },
            "re-password": { required: "Bắt buộc nhập lại mật khẩu", equalTo: "Hai mật khẩu phải giống nhau" },
            gender: { required: "Vui lòng chọn giới tính" },
            terms: { required: "Vui lòng đồng ý với điều khoản" }
        },
        submitHandler: function (form) {
            let name = $("input[name='fullName']").val();
            $(form).hide();
            $("#main").append("<div id='success'>Đăng ký thành công! 🎉<br>Xin chào <b>" + name + "</b></div>");
        }
    });
});