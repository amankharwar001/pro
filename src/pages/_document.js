

// import { Html, Head, Main, NextScript } from "next/document";
// import HeadScript from "@/models/Script/HeadScript";
// import BodyScript from "@/models/Script/BodyScript";
// import FooterScript from "@/models/Script/FooterScript";

// export default function MyDocument({ contentResponse }) {
//   const { header, footer, body } = contentResponse;

//   const extractScriptContent = (scripts) => {
//     return scripts.map((script) => script.dataValues.script);
//   };

//   const headerScripts = header ? extractScriptContent(header) : [];
//   const footerScripts = footer ? extractScriptContent(footer) : [];
//   const bodyScripts = body ? extractScriptContent(body) : [];

//   return (
//     <Html lang="en">
//       <Head>
//         {headerScripts.map((script, index) => (
//           <div
//             key={index}
//             dangerouslySetInnerHTML={{ __html: script }}
//           />
//         ))}

//       </Head>
//       <body>
//         {bodyScripts.map((script, index) => (
//           <div
//             key={index}
//             dangerouslySetInnerHTML={{ __html: script }}
//           />
//         ))}
//         <Main />
//         <footer>
//           {footerScripts.map((script, index) => (
//             <div
//               key={index}
//               dangerouslySetInnerHTML={{ __html: script }}
//             />
//           ))}
//         </footer>
//         <NextScript />
//       </body>
//     </Html>
//   );
// }

// MyDocument.getInitialProps = async (ctx) => {
//   const initialProps = await ctx.defaultGetInitialProps(ctx);

//   const fetchDataSafely = async (fetchFunction, fallback = null) => {
//     try {
//       return await fetchFunction();
//     } catch (error) {
//       console.error(`Error fetching data:`, error);
//       return fallback;
//     }
//   };

//   const headerData = await fetchDataSafely(() => HeadScript.findAll(), []);
//   const bodyData = await fetchDataSafely(() => BodyScript.findAll(), []);
//   const footerData = await fetchDataSafely(() => FooterScript.findAll(), []);

//   const contentResponse = {
//     header: headerData,
//     footer: footerData,
//     body: bodyData,
//   };

//   return {
//     ...initialProps,
//     contentResponse,
//   };
// };




import { Html, Head, Main, NextScript } from "next/document";
import HeadScript from "@/models/Script/HeadScript";
import BodyScript from "@/models/Script/BodyScript";
import FooterScript from "@/models/Script/FooterScript";
import parse from 'html-react-parser';
export default function MyDocument({ contentResponse }) {
  const { header, body, footer } = contentResponse;

  const joinHTMLContent = (items) => {
    return items.map(item => item?.dataValues?.script || "").join("\n");
  };

  const headerHTML = header ? joinHTMLContent(header) : "";
  const bodyHTML = body ? joinHTMLContent(body) : "";
  const footerHTML = footer ? joinHTMLContent(footer) : "";

  return (
    <Html lang="en">
      
      <Head>{parse(headerHTML)}</Head>
      <body>

        {parse(bodyHTML)}
        <Main />

        {parse(footerHTML)}
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);

  const fetchDataSafely = async (fetchFunction, fallback = []) => {
    try {
      return await fetchFunction();
    } catch (error) {
      console.error("Error fetching data:", error);
      return fallback;
    }
  };

  const headerData = await fetchDataSafely(() => HeadScript.findAll());
  const bodyData = await fetchDataSafely(() => BodyScript.findAll());
  const footerData = await fetchDataSafely(() => FooterScript.findAll());

  const contentResponse = {
    header: headerData,
    body: bodyData,
    footer: footerData,
  };

  return {
    ...initialProps,
    contentResponse,
  };
};
