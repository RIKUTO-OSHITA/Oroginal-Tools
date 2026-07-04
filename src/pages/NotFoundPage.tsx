import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page">
      <h1>チケットが見つかりません</h1>
      <p>指定されたチケットは存在しないか、削除された可能性があります。</p>
      <Link to="/" className="button">ボードに戻る</Link>
    </div>
  );
}
