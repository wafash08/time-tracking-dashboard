import TIME_TRACKER from "./data.json";

const ttContainer = document.querySelector(".tt__container");

const dailyTracker = document.querySelector('[data-tracker="daily"]');
const weeklyTracker = document.querySelector('[data-tracker="weekly"]');
const monthlyTracker = document.querySelector('[data-tracker="monthly"]');

function getTrackersByTimeframe(timeframe, trackers) {
  const TIMEFRAMES = {
    daily: "yesterday",
    weekly: "last week",
    monthly: "last month",
  };
  let tracker = [];

  for (let item of trackers) {
    tracker.push({
      title: item.title,
      timeframe: TIMEFRAMES[timeframe],
      trackerByTimeframe: item.timeframes[timeframe],
    });
  }

  return tracker;
}

// menguubah string yang terdiri dari dua kata dan dipisahkan oleh spasi menjadi satu kata dan dipisahkan oleh -. contoh: "Self Care" menjadi "self-care"
function toKebabCase(string) {
  return string.toLowerCase().split(" ").join("-");
}

function renderTrackers(trackers) {
  let html = "";

  trackers.forEach(({ title, timeframe, trackerByTimeframe }) => {
    let { current, previous } = trackerByTimeframe;

    let prevSuffix = Number(previous) > 1 ? "hrs" : "hr";
    let currSuffix = Number(current) > 1 ? "hrs" : "hr";

    html += `<li class="tt tt--${toKebabCase(title)}">
    <div class="tt__inner">
      <div>
        <h2 class="tt__title">${title}</h2>
        <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
            fill="#BBC0FF"
            fill-rule="evenodd"
          />
        </svg>
      </div>
      <div>
        <p class="tt__hour">${current}${currSuffix}</p>
        <p class="tt__time">${timeframe} - ${previous}${prevSuffix}</p>
      </div>
    </div>
  </li>`;
  });
  return html;
}

function removeActiveTracker(current, trackers) {
  if (!current.classList.contains("sc__button--active")) {
    current.classList.add("sc__button--active");
    trackers.forEach(tracker => tracker.classList.remove("sc__button--active"));
  }
}

dailyTracker.addEventListener("click", e => {
  ttContainer.innerHTML = renderTrackers(
    getTrackersByTimeframe("daily", TIME_TRACKER)
  );
  removeActiveTracker(e.currentTarget, [weeklyTracker, monthlyTracker]);
});

weeklyTracker.addEventListener("click", e => {
  ttContainer.innerHTML = renderTrackers(
    getTrackersByTimeframe("weekly", TIME_TRACKER)
  );
  removeActiveTracker(e.currentTarget, [dailyTracker, monthlyTracker]);
});

monthlyTracker.addEventListener("click", e => {
  ttContainer.innerHTML = renderTrackers(
    getTrackersByTimeframe("monthly", TIME_TRACKER)
  );
  removeActiveTracker(e.currentTarget, [dailyTracker, weeklyTracker]);
});

window.addEventListener("DOMContentLoaded", () => {
  ttContainer.innerHTML = renderTrackers(
    getTrackersByTimeframe("weekly", TIME_TRACKER)
  );
  weeklyTracker.classList.add("sc__button--active");
});
