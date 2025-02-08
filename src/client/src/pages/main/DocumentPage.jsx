// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { fetchPublicDocument } from "../../helpers/docs/doc.helper";

// const DocumentPage = () => {
//   const { docId } = useParams();
//   const [document, setDocument] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDocument = async () => {
//       try {
//         const fetchedDocument = await fetchPublicDocument(docId);
//         setDocument(fetchedDocument);
//       } catch (error) {
//         console.error(error);
//         toast.error(error.message || "Failed to load document.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDocument();
//   }, [docId]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!document) {
//     return <p>Document not found or you don't have access.</p>;
//   }

//   return (
//     <div className="container my-5">
//       <h1>{document.title}</h1>
//       <p>Owner: {document.owner.username}</p>
//       <p>{document.content.ops[0]?.insert || "No content available."}</p>
//     </div>
//   );
// };

// export default DocumentPage;
