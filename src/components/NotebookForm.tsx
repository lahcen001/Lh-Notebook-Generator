import { useState } from 'react';

interface NotebookFormProps {
  onGenerate: (topic: string, sections: number) => void;
}

export default function NotebookForm({ onGenerate }: NotebookFormProps) {
  const [topic, setTopic] = useState('');
  const [sections, setSections] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(topic, sections);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium mb-2">
          Topic
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="sections" className="block text-sm font-medium mb-2">
          Number of Sections
        </label>
        <input
          type="number"
          id="sections"
          value={sections}
          onChange={(e) => setSections(parseInt(e.target.value))}
          min="1"
          max="10"
          className="w-full p-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Generate Notebook
      </button>
    </form>
  );
} 