import moment from "moment";
import { useEffect, useState } from "react";

let days = [
  { name: "Mo" },
  { name: "Di" },
  { name: "Mi" },
  { name: "Do" },
  { name: "Fr" },
  { name: "Sa" },
  { name: "So" },
];
let timeHeight = 60;

let times = [
  { time: "9:00" },
  { time: "10:00" },
  { time: "11:00" },
  { time: "12:00" },
  { time: "13:00" },
  { time: "14:00" },
  { time: "15:00" },
  { time: "16:00" },
  { time: "17:00" },
  { time: "18:00" },
];

let entries = [
  {
    day: "Di",
    from: "1995-12-17T11:30:00",
    to: "1995-12-17T12:30:00",
    text: "Hallo",
  },
];

function App() {
  useEffect(() => {}, []);

  const [newEntry, setNewEntry] = useState(null);

  const mouseDownEvent = (e) => {
    console.log(e);
    console.log("Offset Left", e.target.offsetLeft);
    console.log("Offset Top", e.target.offsetTop);
    console.log("Offset Height", e.target.offsetHeight);
    console.log("Offset Width", e.target.offsetWidth);
    console.log("X:", e.pageX);
    console.log("Y:", e.pageY);
    var x = e.pageX - e.target.offsetLeft;
    var y = e.pageY - e.target.offsetTop;

    console.log((y / 15).toFixed(0));

    setNewEntry({ top: (y / 15).toFixed(0) * 15, height: 15 });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <div style={{ width: "100px" }}>
        <div style={{ textAlign: "center", height: 45 }}></div>
        {times.map((time) => {
          return (
            <div
              style={{
                height: timeHeight,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight: "1px solid ",
                borderBottom: "1px solid ",
              }}
            >
              {time.time}
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        {days.map((day) => {
          return (
            <div style={{ flex: "1 1 0", position: "relative" }}>
              <div
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid",
                  height: 45,
                  fontSize: 24,
                }}
              >
                {day.name}
              </div>

              <div style={{ position: "relative" }}>
                {entries.map((entry) => {
                  if (entry.day == day.name) {
                    let dateFrom = new Date(entry.from);
                    let dateTo = new Date(entry.to);

                    let diff = dateTo - dateFrom;

                    let hour = dateFrom.getHours();
                    let minute = dateFrom.getMinutes();
                    diff = new Date(diff);
                    let diffHour = diff.getHours();
                    let diffMinute = diff.getMinutes();

                    let pos = hour * timeHeight - 9 * timeHeight + minute;

                    return (
                      <div
                        style={{
                          backgroundColor: "red",
                          height: diffHour * timeHeight + diffMinute,
                          width: "100%",
                          position: "absolute",
                          top: pos,
                          left: 0,
                          zIndex: 99,
                        }}
                      >
                        <div>HT123123</div>
                        <div>10:00 - 12:30</div>
                      </div>
                    );
                  }
                })}
                {newEntry && (
                  <div
                    style={{
                      backgroundColor: "green",
                      position: "absolute",
                      top: newEntry.top,
                      width: "100%",
                      height: newEntry.height,
                      left: 0,
                    }}
                  ></div>
                )}
              </div>
              <div
                onMouseDown={mouseDownEvent}
                className="Column"
                style={{ position: "relative", height: "100%" }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
