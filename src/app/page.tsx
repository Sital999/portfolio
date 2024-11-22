export default function Home() {
  return (
    <div
      data-theme="halloween"
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div data-theme="sunset">
          This div will always use light theme
          <span data-theme="retro">This span will always use retro theme!</span>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
            Button
          </button>
        </div>
      </main>
    </div>
  );
}
