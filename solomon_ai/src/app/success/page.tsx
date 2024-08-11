import { Suspense } from "react";
import SuccessPage from "./redirect";
export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPage />
    </Suspense>
  );
}
