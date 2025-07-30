export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="w-10 h-10 border-[5px] border-t-transparent border-solid rounded-full animate-spin"
        style={{ borderColor: "#4361ee #4361ee transparent transparent" }}
      ></div>
    </div>
  );
}
