import { remark } from "remark";
import html from "remark-html";

export async function getOperationDescription(rawDesc) {
  const processedDescription = await remark().use(html).process(rawDesc);
  const descriptionHtml = processedDescription.toString();

  return descriptionHtml;
}
