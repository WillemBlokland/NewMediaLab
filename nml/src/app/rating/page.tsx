import dynamic from 'next/dynamic';

const RatingClient = dynamic(() => import('./RatingClient'), { ssr: false });

export default function RatingPage() {
  return <RatingClient />;
}
