function idxToString(idx: number) {
  return ["1st", "2nd", "3rd"][idx];
}

export function CategoryCard({
  category,
}: {
  category: { prizes: number[]; title: string; description: string };
}) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg text-white">
      <h2 className="text-lg font-semibold mb-2">{category.title}</h2>
      <p className="text-gray-300">{category.description}</p>
      <div className="text-gray-300 mt-4">
        {category.prizes?.map((amount, idx) => (
          <div key={idx}>
            {idxToString(idx)}: ${amount}
          </div>
        ))}
      </div>
    </div>
  );
}
