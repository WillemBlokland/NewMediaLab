import { Suspense } from "react";
import TextClient from "./TextClient";

export default function TextPage() {
  return (
    <Suspense fallback={<div>Loading story...</div>}>
      <TextClient />
    </Suspense>
  );
}
