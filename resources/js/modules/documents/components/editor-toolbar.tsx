import { Bold, Italic, List, ListOrdered, Underline } from 'lucide-react';

export default function EditorToolbar({
  apply,
}: {
  apply: (command: string, value?: string) => void;
}) {
  const button = (label: string, command: string, icon: React.ReactNode) => (
    <button
      type="button"
      aria-label={label}
      title={label}
      onMouseDown={(event) => {
        event.preventDefault();
        apply(command);
      }}
      className="flex size-8 items-center justify-center rounded-md text-[#5f6368] transition hover:bg-[#f1f3f4] hover:text-[#202124]"
    >
      {icon}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-[#dadce0] px-5 py-2 sm:px-8">
      {button('Bold', 'bold', <Bold className="size-4" />)}
      {button('Italic', 'italic', <Italic className="size-4" />)}
      {button('Underline', 'underline', <Underline className="size-4" />)}
      <span className="mx-2 h-5 w-px bg-[#dadce0]" />
      <select
        defaultValue="p"
        onChange={(event) => apply('formatBlock', event.target.value)}
        aria-label="Text style"
        className="h-8 rounded-md border-0 bg-transparent px-2 text-sm text-[#5f6368] outline-none hover:bg-[#f1f3f4]"
      >
        <option value="p">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>
      <span className="mx-2 h-5 w-px bg-[#dadce0]" />
      {button(
        'Bulleted list',
        'insertUnorderedList',
        <List className="size-4" />,
      )}
      {button(
        'Numbered list',
        'insertOrderedList',
        <ListOrdered className="size-4" />,
      )}
    </div>
  );
}
