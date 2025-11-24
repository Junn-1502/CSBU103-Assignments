// Lấy phần tử hiển thị phép tính trước và số hiện tại
const prevEl = document.getElementById('prev');
const curEl  = document.getElementById('current');

// Biến trạng thái của máy tính
let current = '0';        // Số hiện tại đang nhập/hiển thị
let previous = '';        // Số trước đó (dùng cho phép tính)
let operator = null;      // Toán tử hiện tại (+, -, *, /, %)
let justEvaluated = false; // Cờ đánh dấu vừa tính xong (để reset khi nhập số mới)

// Hàm định dạng giá trị hiển thị
const format = (val) => {
  // Giữ dạng chuỗi để tránh mất độ chính xác; định dạng số lớn
  const n = Number(val);
  if (!isFinite(n)) return 'Error'; // Nếu không phải số hợp lệ thì báo lỗi
  const parts = val.split('.');
  if (parts[0].length > 15) {
    // Nếu phần nguyên quá dài thì chuyển sang dạng khoa học
    return n.toExponential(6).replace('+', '');
  }
  return val;
};

// Cập nhật màn hình hiển thị
const updateDisplay = () => {
  curEl.textContent = format(current); // Hiển thị số hiện tại
  prevEl.textContent = previous && operator ? `${previous} ${operator}` : ''; // Hiển thị số trước + toán tử
};

// Xóa toàn bộ dữ liệu
const clearAll = () => {
  current = '0';
  previous = '';
  operator = null;
  justEvaluated = false;
  updateDisplay();
};

// Thêm số hoặc dấu chấm vào current
const appendNumber = (num) => {
  if (justEvaluated) { // Nếu vừa tính xong thì reset current
    current = '0';
    justEvaluated = false;
  }
  if (current === '0' && num !== '.') current = num; // Thay thế số 0 ban đầu
  else if (num === '.' && current.includes('.')) return; // Không cho nhập nhiều dấu chấm
  else current += num; // Thêm số vào chuỗi hiện tại
  updateDisplay();
};

// Chọn toán tử
const chooseOperator = (op) => {
  if (operator && previous && current !== '0' && !justEvaluated) {
    // Nếu đã có toán tử và số trước đó thì tính luôn (chuỗi phép tính)
    compute();
  }
  operator = op;
  previous = current;
  current = '0';
  justEvaluated = false;
  updateDisplay();
};

// Thực hiện phép tính
const compute = () => {
  if (!operator || previous === '') return; // Nếu chưa có toán tử thì bỏ qua
  const a = Number(previous);
  const b = Number(current);
  let result;

  // Xử lý theo từng toán tử
  switch (operator) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/': result = b === 0 ? 'Error' : a / b; break; // Chia cho 0 thì báo lỗi
    case '%': result = a % b; break;
    default: return;
  }

  // Cập nhật kết quả
  current = String(result);
  previous = '';
  operator = null;
  justEvaluated = true; // Đánh dấu vừa tính xong
  updateDisplay();
};

// Xóa một ký tự cuối cùng
const del = () => {
  if (justEvaluated) { // Nếu vừa tính xong thì reset current
    current = '0';
    justEvaluated = false;
  }
  if (current.length > 1) current = current.slice(0, -1); // Xóa 1 ký tự cuối
  else current = '0'; // Nếu chỉ còn 1 ký tự thì reset về 0
  updateDisplay();
};

// Gắn sự kiện click cho các nút số
document.querySelectorAll('[data-num]').forEach(btn =>
  btn.addEventListener('click', () => appendNumber(btn.dataset.num))
);

// Gắn sự kiện click cho các nút toán tử
document.querySelectorAll('[data-op]').forEach(btn =>
  btn.addEventListener('click', () => chooseOperator(btn.dataset.op))
);

// Gắn sự kiện cho các nút chức năng khác
document.querySelector('[data-action="dot"]').addEventListener('click', () => appendNumber('.'));
document.querySelector('[data-action="equals"]').addEventListener('click', compute);
document.querySelector('[data-action="clear"]').addEventListener('click', clearAll);
document.querySelector('[data-action="delete"]').addEventListener('click', del);

// Hỗ trợ nhập từ bàn phím
window.addEventListener('keydown', (e) => {
  const k = e.key;
  if (/\d/.test(k)) appendNumber(k); // Nếu là số
  else if (k === '.') appendNumber('.'); // Dấu chấm
  else if (['+', '-', '*', '/','%'].includes(k)) chooseOperator(k); // Toán tử
  else if (k === 'Enter' || k === '=') compute(); // Phím Enter hoặc =
  else if (k === 'Backspace') del(); // Xóa ký tự
  else if (k.toLowerCase() === 'c') clearAll(); // Phím C để xóa toàn bộ
});

// Khởi tạo hiển thị ban đầu
updateDisplay();