// đồng bộ / bất đồng bộ
setTimeout(function () {
  console.log("bật quảng cáo");
}, 3000);

//axios
//gọi api
axios({
  url: "https://api.tiki.vn/raiden/v2/menu-config?platform=desktop",
  mothod: "GET",
})
  .then(function (res) {
    //xử lí khi gọi api thành công
    console.log(res.data.menu_block.items);
  })
  .catch(function (err) {
    //xử lí khi gọi api thất bại
    console.log(err);
  });
