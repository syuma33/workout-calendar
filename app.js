const daysEl = document.getElementById("days");
const monthLabel = document.getElementById("monthLabel");
const selectedDateLabel = document.getElementById("selectedDate");
//const weeklyCountLabel = document.getElementById("weeklyCount");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const saveBtn = document.getElementById("save");

const selects = document.querySelectorAll(".part-select");
const memos = document.querySelectorAll(".memo");
const parts = ["胸", "肩", "腕", "背中", "脚"];

let currentDate = new Date();
let selectedDate = null;

// 日付キー
function dateKey(d) {
    return d.toISOString().slice(0, 10);
}

// 部位プルダウン初期化
selects.forEach((s, i) => {
    s.innerHTML = `<option value="">部位を選択</option>` +
        parts.map(p => `<option value="${p}">${p}</option>`).join("");

    s.addEventListener("change", () => {
        if (s.value) {
            memos[i].style.display = "block";
            if (i + 1 < selects.length) {
                selects[i + 1].style.display = "block";
            }
        }
    });
});

// カレンダー描画
function renderCalendar() {
    daysEl.innerHTML = "";

    const y = currentDate.getFullYear();
    const m = currentDate.getMonth();
    monthLabel.textContent = `${y}年 ${m + 1}月`;

    const firstDay = new Date(y, m, 1).getDay();
    const lastDate = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        daysEl.appendChild(document.createElement("div"));
    }

    for (let d = 1; d <= lastDate; d++) {
        const dayEl = document.createElement("div");
        dayEl.className = "day";
        dayEl.textContent = d;

        const date = new Date(y, m, d);
        const key = dateKey(date);

        const raw = localStorage.getItem(key);
        if (raw) {
            const data = JSON.parse(raw);

            if (data.length === 1) {
                // ✅ 1部位：単色
                addPartClass(dayEl, data[0].part);

            } else if (data.length >= 2) {
                // ✅ 2部位以上：2色分割
                dayEl.classList.add("two-parts");

                const color1 = getPartColor(data[0].part);
                const color2 = getPartColor(data[1].part);

                dayEl.style.setProperty("--part-color-1", color1);
                dayEl.style.setProperty("--part-color-2", color2);
            }
        }
        //if (localStorage.getItem(key)) {
        //    dayEl.classList.add("has-workout");
        //}

        dayEl.addEventListener("click", () => {
            document.querySelectorAll(".day").forEach(el => el.classList.remove("selected"));
            dayEl.classList.add("selected");

            selectedDate = date;
            selectedDateLabel.textContent = `${y}年${m + 1}月${d}日の筋トレ`;

            const data = JSON.parse(localStorage.getItem(key) || "[]");
            selects.forEach((s, i) => {
                s.value = data[i]?.part || "";
                memos[i].value = data[i]?.memo || "";
                s.style.display = "block";
                memos[i].style.display = s.value ? "block" : "none";
            });
        });

        daysEl.appendChild(dayEl);
    }
    updateWeeklyCount();
}
function getPartColor(part) {
    switch (part) {
        case "胸": return "#f6c1c1";
        case "肩": return "#c7dbf6";
        case "腕": return "#fde2b0";
        case "背中": return "#dccaf3";
        case "脚": return "#cfead6";
        default: return "#ffffff";
    }
}

function addPartClass(el, part) {
    switch (part) {
        case "胸": el.classList.add("part-chest"); break;
        case "肩": el.classList.add("part-shoulder"); break;
        case "腕": el.classList.add("part-arm"); break;
        case "背中": el.classList.add("part-back"); break;
        case "脚": el.classList.add("part-leg"); break;
    }
}
``

function parseLocalDate(key) {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d);
}


// 保存
saveBtn.addEventListener("click", () => {
    if (!selectedDate) {
        alert("日付を選択してください");
        return;
    }

    const data = [];
    selects.forEach((s, i) => {
        if (s.value && memos[i].value.trim()) {
            data.push({
                part: s.value,
                memo: memos[i].value.trim()
            });
        }
    });

    const key = dateKey(selectedDate);

    if (data.length > 0) {
        localStorage.setItem(key, JSON.stringify(data));
    } else {
        // ✅ 部位が無ければ消す
        localStorage.removeItem(key);
    }

    renderCalendar();
    updateWeeklyCount();
});

// 月切替
prevBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};
nextBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};

renderCalendar();
//const daysElement = document.getElementById("days");
//const monthLabel = document.getElementById("monthLabel");
//const selectedDateLabel = document.getElementById("selectedDate");
//const workoutText = document.getElementById("workoutText");

//const prevBtn = document.getElementById("prev");
//const nextBtn = document.getElementById("next");
//const saveBtn = document.getElementById("save");

//let currentDate = new Date();
//let selectedDate = null;

//// YYYY-MM-DD 形式
//function dateKey(date) {
//    return date.toISOString().slice(0, 10);
//}

//function renderCalendar() {
//    daysElement.innerHTML = "";

//    const year = currentDate.getFullYear();
//    const month = currentDate.getMonth();
//    monthLabel.textContent = `${year}年 ${month + 1}月`;

//    const firstDay = new Date(year, month, 1).getDay();
//    const lastDate = new Date(year, month + 1, 0).getDate();

//    // 空白
//    for (let i = 0; i < firstDay; i++) {
//        const blank = document.createElement("div");
//        daysElement.appendChild(blank);
//    }

//    // 日付生成
//    for (let d = 1; d <= lastDate; d++) {
//        const day = document.createElement("div");
//        day.className = "day";
//        day.textContent = d;

//        const date = new Date(year, month, d);
//        const key = dateKey(date);

//        // ●表示
//        if (localStorage.getItem(key)) {
//            day.classList.add("has-workout");
//        }

//        day.addEventListener("click", () => {
//            document.querySelectorAll(".day").forEach(el => el.classList.remove("selected"));
//            day.classList.add("selected");

//            selectedDate = date;
//            selectedDateLabel.textContent = `${year}年${month + 1}月${d}日の筋トレ`;
//            workoutText.value = localStorage.getItem(key) || "";
//        });

//        daysElement.appendChild(day);
//    }
//}

//// 保存
//saveBtn.addEventListener("click", () => {
//    if (!selectedDate) return alert("日付を選択してください");

//    const key = dateKey(selectedDate);
//    localStorage.setItem(key, workoutText.value);
//    renderCalendar();
//    alert("保存しました");
//});

//prevBtn.addEventListener("click", () => {
//    currentDate.setMonth(currentDate.getMonth() - 1);
//    renderCalendar();
//});

//nextBtn.addEventListener("click", () => {
//    currentDate.setMonth(currentDate.getMonth() + 1);
//    renderCalendar();
//});

//renderCalendar();
