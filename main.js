import TIME_TRACKER from "./data.json";

const ttContainer = document.querySelector(".tt-container");

const dailyTracker = document.querySelector('[data-tracker="daily"]');
const weeklyTracker = document.querySelector('[data-tracker="weekly"]');
const monthlyTracker = document.querySelector('[data-tracker="monthly"]');

function getTrackersByTimeframe(timeframe, trackers) {
  let tracker = [];

  for (let item of trackers) {
    tracker.push({
      title: item.title,
      trackerByTimeframe: item.timeframes[timeframe],
    });
  }

  return tracker;
}

// ubah title yang terdiri dari dua kata dan dipisahkan oleh spasi menjadi satu kata dan dipisahkan oleh -. contoh: "Self Care" menjadi "self-care"
function toKebabCase(title) {
  return title.toLowerCase().split(" ").join("-");
}

function renderTrackers(trackers) {
  let html = "";

  trackers.forEach(({ title, trackerByTimeframe }) => {
    let { current, previous } = trackerByTimeframe;

    let prevSuffix = previous > 1 ? "hrs" : "hr";
    let currSuffix = previous > 1 ? "hrs" : "hr";

    html += `<div class="tt tt--${toKebabCase(title)}">
    <div class="tt-inner">
      <div>
        <h2 class="tt-title">${title}</h2>
        <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
            fill="#BBC0FF"
            fill-rule="evenodd"
          />
        </svg>
      </div>
      <div>
        <p class="tt-hour">${current}${currSuffix}</p>
        <p class="tt-time">Last Week - ${previous}${prevSuffix}</p>
      </div>
    </div>
  </div>`;
  });
  return html;
}

dailyTracker.addEventListener("click", e => {
  console.log("daily triggered");
  ttContainer.innerHTML = renderTrackers(
    getTrackersByTimeframe("daily", TIME_TRACKER)
  );
});

weeklyTracker.addEventListener("click", e => {
  console.log("weekly triggered");
  ttContainer.innerHTML = renderTrackers(
    getTrackersByTimeframe("weekly", TIME_TRACKER)
  );
});

monthlyTracker.addEventListener("click", e => {
  console.log("monthly triggered");
  ttContainer.innerHTML = renderTrackers(
    getTrackersByTimeframe("monthly", TIME_TRACKER)
  );
});

window.addEventListener("DOMContentLoaded", () => {
  ttContainer.innerHTML = renderTrackers(
    getTrackersByTimeframe("weekly", TIME_TRACKER)
  );
});
