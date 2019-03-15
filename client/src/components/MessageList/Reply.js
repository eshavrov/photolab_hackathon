import React, { PureComponent } from 'react';

function generateLines(text, max, min = 15) {
  const words = text.split(' ');
  const lines = [''];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (lines[lines.length - 1].length + 1 + word.length < max) {
      lines[lines.length - 1] += ' ' + word;
    } else {
      lines.push(word);
    }
  }
  const textWidth = Math.max(...lines.map(line => line.length), min);

  return lines.map(line => `${line}${' '.repeat(textWidth - line.length)}`);
}

function generate(text, width = 50, type, time = '', author = 'Unknown person') {
  const name = author;
  const min = Math.max(author.length + 4, 15);
  const lines = generateLines(text, width, min);

  const textWidth = Math.max(...lines.map(line => line.length), min);

  if (type) {
    return `+${'-'.repeat(textWidth + 1)}-+  
 ${lines.reduce(
   (acc, line) => `${acc}| ${line} |  
 `,
   ''
 )}|${' '.repeat(textWidth + 2)}|  
+${'-'.repeat(textWidth + 1 - time.length)}${time}-+--`;
  } else {
    return `  +${'-'.repeat(textWidth - 1 - name.length)}[${name}]-+
${lines.reduce(
  (acc, line) => `${acc}  | ${line} |
`,
  ''
)}  |${' '.repeat(textWidth + 2)}|
--+${'-'.repeat(textWidth + 1 - time.length)}${time}-+`;
  }
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const m = date.getMinutes();
  return `${date.getHours()}:${m < 10 ? '0' + m : m}`;
}

class Reply extends PureComponent {
  render() {
    const { text, my, timestamp, author } = this.props;

    return <pre className={my ? 'right' : 'left'}>{generate(text, 45, my, formatTime(timestamp), author)}</pre>;
  }
}

export default Reply;
