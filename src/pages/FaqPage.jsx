import FAQ from '../components/FAQ/FAQ.jsx';

const ITEMS = [
  {
    question: 'Is this tool free to use?',
    answer:
      'Yes. The CodeClean optimizer is free to use in your browser. No account is required for the MVP. A Pro plan is shown for future extras and is not billed in this version.',
  },
  {
    question: 'Which programming languages are supported?',
    answer:
      'HTML, CSS, JavaScript, and JSON are fully formatted. XML is indented conservatively. PHP, WordPress templates, and Shopify Liquid keep PHP/Liquid regions intact while surrounding HTML is formatted when it is safe.',
  },
  {
    question: 'Does the tool change my code logic?',
    answer:
      'No. CodeClean is a conservative formatter, not a minifier or refactoring tool. It does not rename variables, rewrite expressions, or execute your code. If formatting cannot be validated, the original input is kept.',
  },
  {
    question: 'Is my code safe and private?',
    answer:
      'Yes. Optimization runs locally in your browser. Pasted source code is not uploaded, stored, or logged by this application.',
  },
  {
    question: 'Can I use this for commercial projects?',
    answer:
      'Yes. You can copy or download the formatted result and use it in commercial work. Always review the output before shipping it, especially for mixed PHP or Liquid templates.',
  },
];

export default function FaqPage() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="cc-card p-4 p-lg-5">
          <h1 className="fw-bold mb-4">Frequently Asked Questions</h1>
          <FAQ items={ITEMS} />
        </div>
      </div>
    </section>
  );
}
