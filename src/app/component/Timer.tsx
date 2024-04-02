import { useStopwatch } from "react-timer-hook";
import useFetchRecord from "../utils/useFetchRecord";
import Record from "../types/RecordType";
import { format } from "date-fns";

interface Props {
  taskTitle: string;
  taskGroup: string;
}
export default function Timer({ taskTitle, taskGroup }: Props) {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  const [records, fetchRecords, postRecord] = useFetchRecord();

  const time = `${hours}:${minutes}:${seconds}`;

  return (
    <>
      {isRunning ? (
        <>
          <span className="text-xl">{time}</span>
          <button
            onClick={async () => {
              pause();
              const record: Record = {
                userId: "",
                taskTitle: taskTitle,
                taskGroup: taskGroup,
                date: format(new Date(), "yyyy-MM-dd"),
                duration: time,
              };
              await postRecord(JSON.stringify(record));
              reset(undefined, false);
            }}
          >
            Stop
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            start();
          }}
        >
          Start
        </button>
      )}
    </>
  );
}
