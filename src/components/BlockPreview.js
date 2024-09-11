const BlockPreview = ({ block, onClose }) => {
  console.log("block preview is",block)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">{block.title}</h2>
        <p className="mb-4">{block.description}</p>
        <h3 className="text-xl font-bold mb-2">Transition History</h3>
        <ul className="mb-4">
          {block.transitions.map((transition, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">{transition.from}</span> → 
              <span className="font-semibold">{transition.to}</span>
              <span className="text-sm text-gray-600"> ({new Date(transition.date).toLocaleString()})</span>
              <p className="text-sm italic">{transition.reason}</p>
            </li>
          ))}
        </ul>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BlockPreview;
