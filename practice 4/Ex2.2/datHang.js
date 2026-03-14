$(document).ready(function(){

const prices={
ao:150000,
quan:200000,
giay:300000
};


function calcTotal(){

let p=$("#product").val();
let q=$("#quantity").val();

if(p && q){
let money=prices[p]*q;
$("#total").text(Number(money).toLocaleString("vi-VN"));
}else{
$("#total").text("0");
}

}

$("#product").change(calcTotal);
$("#quantity").on("input",calcTotal);

$("#note").on("input",function(){

let len=$(this).val().length;

$("#count").text(len+"/200");

if(len>200){
$("#count").css("color","red");
}else{
$("#count").css("color","black");
}

});

$.validator.addMethod("validDate",function(value){

let d=new Date(value);
let today=new Date();
today.setHours(0,0,0,0);

let max=new Date();
max.setDate(today.getDate()+30);

return d>=today && d<=max;

},"Ngày giao phải từ hôm nay đến 30 ngày");

$("#orderForm").validate({

onfocusout:false,
onkeyup:false,
onclick:false,

errorPlacement: function(error, element) {
    if (element.attr("name") === "pay") {
      error.insertAfter(".pay .field-controls");
    } else {
      error.insertAfter(element);
    }
},

rules:{

product:{required:true},

quantity:{
required:true,
min:1,
max:99
},

date:{
required:true,
validDate:true
},

address:{
required:true,
minlength:10
},

note:{
maxlength:200
},

pay:{
required:true
}

},

messages:{

product:{required:"Chọn sản phẩm"},

quantity:{
required:"Nhập số lượng",
min:"Tối thiểu 1",
max:"Tối đa 99"
},

date:{
required:"Chọn ngày giao"
},

address:{
required:"Nhập địa chỉ",
minlength:"Ít nhất 10 ký tự"
},

note:{
maxlength:"Tối đa 200 ký tự"
},

pay:{
required:"Chọn phương thức thanh toán"
}

},

submitHandler:function(form){

let product=$("#product option:selected").text();
let quantity=$("#quantity").val();
let total=$("#total").text();
let date=$("#date").val();

$("#summary").html(
"Tên SP: "+product+"<br>"+
"Số lượng: "+quantity+"<br>"+
"Tổng tiền: "+total+" VNĐ<br>"+
"Ngày giao: "+date
);

$("#confirmBox").show();

}

});

$("#confirmBtn").click(function(){

alert("Đặt hàng thành công!");
$("#orderForm")[0].reset();

$("#confirmBox").hide();
$("#total").text("0");
$("#count").text("0/200");

});

$("#cancelBtn").click(function(){
$("#confirmBox").hide();
});

});