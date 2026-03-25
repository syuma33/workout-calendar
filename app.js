const daysElement = document.getElementById("days");
const monthLabel = document.getElementById("monthLabel");
const selectedDateLabel = document.getElementById("selectedDate");
const workoutText = document.getElementById("workoutText");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const saveBtn = document.getElementById("save");

let currentDate = new Date();
let selectedDate = null;

// YYYY-MM-DD 形式
function dateKey(date) {
    return date.toISOString().slice(0, 10);
}

function renderCalendar() {
    daysElement.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthLabel.textContent = `${year}年 ${month + 1}月`;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 空白
    for (let i = 0; i < firstDay; i++) {
        const blank = document.createElement("div");
        daysElement.appendChild(blank);
    }

    // 日付生成
    for (let d = 1; d <= lastDate; d++) {
        const day = document.createElement("div");
        day.className = "day";
        day.textContent = d;

        const date = new Date(year, month, d);
        const key = dateKey(date);

        // ●表示
        if (localStorage.getItem(key)) {
            day.classList.add("has-workout");
        }

        day.addEventListener("click", () => {
            document.querySelectorAll(".day").forEach(el => el.classList.remove("selected"));
            day.classList.add("selected");

            selectedDate = date;
            selectedDateLabel.textContent = `${year}年${month + 1}月${d}日の筋トレ`;
            workoutText.value = localStorage.getItem(key) || "";
        });

        daysElement.appendChild(day);
    }
}

// 保存
saveBtn.addEventListener("click", () => {
    if (!selectedDate) return alert("日付を選択してください");

    const key = dateKey(selectedDate);
    localStorage.setItem(key, workoutText.value);
    renderCalendar();
    alert("保存しました");
});

prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();
