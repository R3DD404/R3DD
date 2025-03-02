export default function ExitButton({ onExit }: { onExit: () => void }) {
    return (
      <button
        onClick={onExit}
        className="fixed top-4 right-4 px-6 py-2 border-2 border-[#00ff00] rounded-lg text-[#00ff00] hover:bg-[#00ff00]/10 transition-colors z-50"
      >
        EXIT
      </button>
    )
  }
  
  