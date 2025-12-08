const lp = {
  color: 'white',
  text: '(',
};
const rp = {
  color: 'white',
  text: ')',
  element: 'span',
};
const lines: Array<Array<{ text: string; color: string; pad?: number }>> = [
  [
    { color: '#4FC1FF', text: 'CREATE TABLE ' },
    { color: '#DCDCAA', text: 'wiki_documents' },
    lp,
  ],
  [
    { color: '#9CDCFE', text: 'tenant_id uuid', pad: 12 },
    { color: 'white', text: ',' },
  ],
  [
    { color: '#9CDCFE', text: 'id integer', pad: 12 },
    { color: 'white', text: ',' },
  ],
  [
    { color: '#9CDCFE', text: 'embedding ', pad: 12 },
    { color: '#DCDCAA', text: 'vector' },
    lp,
    { color: '#B5CEA8', text: '3' },
    { color: 'white', text: ')' },
  ],
  [{ color: 'white', text: ');' }],
  [],
  [
    { color: '#4FC1FF', text: 'INSERT INTO ' },

    { color: '#DCDCAA', text: 'wiki_documents' },
    { color: 'white', text: '(' },
  ],
  [
    { color: '#9CDCFE', text: 'tenant_id', pad: 12 },
    { color: 'white', text: ', ' },
  ],
  [
    { color: '#9CDCFE', text: 'id', pad: 12 },
    { color: 'white', text: ', ' },
  ],
  [{ color: '#9CDCFE', text: 'embedding', pad: 12 }],

  [rp, { color: '#DCDCAA', text: ' VALUES ' }, lp],
  [
    {
      color: 'white',
      text: "'0191c7b8-c62b-7574-b15c-35b1b6fc06fc'",
      pad: 12,
    },
    { color: 'white', text: ', ' },
  ],
  [
    { color: '#B5CEA8', text: '1', pad: 12 },
    { color: 'white', text: ', ' },
  ],
  [
    {
      color: 'white',
      text: '[',
      pad: 12,
    },
    { color: '#B5CEA8', text: '18' },
    { color: 'white', text: ', ' },
    { color: '#B5CEA8', text: '24' },
    { color: 'white', text: ', ' },
    { color: '#B5CEA8', text: '43' },
    { color: 'white', text: ']' },
  ],
  [rp, { color: 'white', text: ';' }],
  [],
  [
    { color: '#4FC1FF', text: 'SELECT ' },
    { color: '#9CDCFE', text: 'embedding' },
    { color: 'white', text: " <-> '[" },
    { color: '#B5CEA8', text: '34' },
    { color: 'white', text: ', ' },
    { color: '#B5CEA8', text: '09' },
    { color: 'white', text: ', ' },
    { color: '#B5CEA8', text: '42' },
    { color: 'white', text: "]' " },
  ],
  [
    { color: '#4FC1FF', text: 'AS ', pad: 12 },
    { color: '#9CDCFE', text: 'distance ' },
  ],
  [
    { color: '#4FC1FF', text: 'FROM ', pad: 12 },
    { color: '#9CDCFE', text: 'wiki_documents' },
    { color: 'white', text: ';' },
  ],
];

export default function MobileLines() {
  return (
    <div className="relative w-full">
      {lines.map((words, line) => {
        return (
          <div
            key={`${line}`}
            className="flex flex-row items-start gap-2 text-[11px]"
          >
            <div className="w-4 text-end leading-4 text-[#D4D4D44D]">
              {line + 1}
            </div>
            <div className="whitespace-nowrap leading-4">
              {words.map((word, currentWord) => {
                return (
                  <span
                    style={{
                      color: word.color,
                      paddingLeft: word.pad ? `${word.pad}px` : 0,
                    }}
                    key={`${line}${word.text}${currentWord}`}
                  >
                    {word.text}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
