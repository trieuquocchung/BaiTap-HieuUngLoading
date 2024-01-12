//gọi api lấy danh sách sản phẩm hiện có từ server
/**
 * GET: lấy danh sách, lấy chi tiết
 * POST: tạo mới
 * PUT: cập nhật
 * DELETE: xóa
 */

//hiệu ứng loading: bât jon 1 lần trước khi api chạy, bật off 2 lần trong then và catch
function turnOnLoading() {
  document.querySelector(".spinner-border").style.display = "block";
}

function turnOffLoading() {
  document.querySelector(".spinner-border").style.display = "none";
}
var idEdited = null;

function resetForm() {
  var listInput = document.querySelectorAll("input");
  for (var i = 0; i < listInput.length; i++) {
    listInput[i].value = "";
  }
}

function renderProduct(productArray) {
  var content = "";
  for (var i = productArray.length - 1; i >= 0; i--) {
    var product = productArray[i];
    content += `<tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.img}</td>
        <td>${product.desc}</td>
        <td>
            <button onclick="deleteProduct(${product.id})" class="btn btn-info">Delete</button>
            <button onclick="editProduct(${product.id})" class="btn btn-success" data-toggle="modal"
                data-target="#myModal">Edit</button>
        </td>
      </tr>`;
  }
  document.getElementById("tblDanhSachSP").innerHTML = content;
}

function fetchProductList() {
  turnOnLoading();
  axios({
    url: "https://6597f7ca668d248edf23d080.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      console.log(res.data);
      //gọi hàm renderProduct sau khi lấy data từ server
      renderProduct(res.data);
      turnOffLoading();
    })
    .catch(function (err) {
      console.log(err);
      turnOffLoading();
    });
}
fetchProductList();
// xóa 1 sp từ server
function deleteProduct(id) {
  turnOnLoading();
  //gọi api sau khi xóa sp
  axios({
    url: `https://6597f7ca668d248edf23d080.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      turnOffLoading();
      //xóa thành công, gọi lại api lấy dssp mới nhất
      fetchProductList();
      res.data;
    })
    .catch(function (err) {
      turnOffLoading();
      //xóa thất bại
      err;
    });
}

function createProduct() {
  turnOnLoading();
  console.log("yes");
  //lấy data user nhập
  var tenSP = document.getElementById("TenSP").value;
  var giaSP = document.getElementById("GiaSP").value;
  var hinhSP = document.getElementById("HinhSP").value;
  var moTaSP = document.getElementById("MoTaSP").value;

  //tạo object mới có key trùng với schema trên server
  var sp = {
    name: tenSP,
    price: giaSP,
    img: hinhSP,
    desc: moTaSP,
  };
  console.log(sp);

  //gọi api
  axios({
    url: "https://6597f7ca668d248edf23d080.mockapi.io/product",
    method: "POST",
    data: sp,
  })
    .then(function (res) {
      turnOffLoading();
      // render lại dssp sau khi thêm sp thành công
      console.log(res);
      fetchProductList();
      //tắt modal sau khi thêm thành công
      $("#myModal").modal("hide");
      $(".modal-backdrop").remove();
    })
    .catch(function (err) {
      turnOffLoading();
      console.log(err);
    });
}

//khi user click button edit - get by id - lấy thông tin chi tiết của 1 sản phẩm dựa vào id
function editProduct(id) {
  idEdited = id;
  axios({
    url: `https://6597f7ca668d248edf23d080.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then(function (res) {
      //xóa thành công, gọi lại api lấy dssp mới nhất
      console.log(res.data);
      //hiển thị response lên layout
      var sp = res.data;
      document.getElementById("TenSP").value = sp.name;
      document.getElementById("GiaSP").value = sp.price;
      document.getElementById("HinhSP").value = sp.img;
      document.getElementById("MoTaSP").value = sp.desc;
    })
    .catch(function (err) {
      //xóa thất bại
      console.log(err);
    });
}

function updateProduct() {
  //lấy data user nhập
  var tenSP = document.getElementById("TenSP").value;
  var giaSP = document.getElementById("GiaSP").value;
  var hinhSP = document.getElementById("HinhSP").value;
  var moTaSP = document.getElementById("MoTaSP").value;
  var sp = {
    name: tenSP,
    price: giaSP,
    img: hinhSP,
    desc: moTaSP,
  };

  axios({
    url: `https://6597f7ca668d248edf23d080.mockapi.io/product/${idEdited}`,
    method: "PUT",
    data: sp,
  })
    .then(function (res) {
      //update thành công
      //tắt modal
      $("#myModal").modal("hide");
      //render ddsp
      fetchProductList();
    })
    .catch(function (err) {
      err;
    });
}
