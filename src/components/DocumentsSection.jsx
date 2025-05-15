import React, { useEffect, useState } from "react";
import Pdfupload from "./PdfUpload";
import styled from "styled-components";


const DocumentsSection = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDocuments = async () => {
        try {
            const res = await fetch("https://backend-453n.onrender.com/api/user/dashboard/documents", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch documents");
            }

            const data = await res.json();
            setDocuments(data.documents || []);
        } catch (error) {
            console.error("Error fetching documents:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    // Utility function to detect image files
    const isImageFile = (url) => {
        return /\.(jpeg|jpg|png|gif|webp)$/i.test(url);
    };

    const getFileTypeLabel = (url) => {
        if (url.endsWith(".pdf")) return "📄 PDF Document";
        if (url.endsWith(".doc") || url.endsWith(".docx")) return "📝 Word Document";
        if (url.endsWith(".ppt") || url.endsWith(".pptx")) return "📊 PowerPoint";
        if (url.endsWith(".xls") || url.endsWith(".xlsx")) return "📈 Excel Sheet";
        return "📁 Document File";
    };

    return (

        <div className="bg-white rounded-xl p-6">
            <Pdfupload />
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Medical Documents</h2>

            {loading ? (
                <p className="text-gray-500">Loading documents...</p>
            ) : documents.length === 0 ? (
                <p className="text-gray-500">No documents uploaded yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {documents.map((doc) => (
                        <div key={doc._id} className="border rounded shadow-sm p-2">
                            <a
                                href={doc.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Click to view or download"
                            >
                                {isImageFile(doc.file) ? (
                                    <img
                                        src={doc.file}
                                        alt="Medical Document"
                                        className="w-full h-64 object-cover rounded"
                                    />
                                ) : (
                                    <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded">
                                        <div className="text-center">
                                            <p className="text-lg font-semibold text-gray-700">
                                                {getFileTypeLabel(doc.file)}
                                            </p>
                                            <p className="text-sm text-gray-500">Click to view or download</p>
                                        </div>
                                    </div>
                                )}
                            </a>
                            <div className="p-2 bg-gray-50 text-sm text-gray-700 font-semibold">

                                <div className="flex items-center justify-between w-full">
                                    <span className="font-normal">Author: {doc.author.fullname}</span>
                                    <StyledWrapper>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={22}
                                            height={22}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-trash-2 cursor-pointer"
                                        >
                                            <path d="M3 6h18" />
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                            <line x1={10} x2={10} y1={11} y2={17} />
                                            <line x1={14} x2={14} y1={11} y2={17} />
                                        </svg>
                                    </StyledWrapper>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>

            )}
        </div>

    );
};
const StyledWrapper = styled.div`
.card {
    background: #222222;
    width: 260px;
    border: 2px solid #313131;
    border-radius: 10px;
    padding: 3px 4px;

    .separator {
      width: 100%;
      border: 1px solid #444444;
      border-radius: 10px;
      margin: 5px 0px;
    }

    .list {
      color: #e9e9e9;
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 3px;

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
        padding: 6px 8px;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        user-select: none;

        svg {
          z-index: 1;
          transition: all 0.3s ease;
        }
        &:hover {
          background: #333333;
        }

        .label {
          font-weight: 400;
          transition: all 0.2s ease;
        }

        &.favorite {
          .fav-label {
            position: absolute;
            transform: translateY(-100%) translateX(-15px) scale(0.8);
            opacity: 0;
          }

          .input {
            width: 100%;
            height: 100%;
            position: absolute;
            appearance: none;
            cursor: pointer;
            z-index: 100;
          }

          .input:checked ~ .fav-label {
            transform: translateY(0);
            opacity: 1;
          }

          .input:checked ~ .label:not(.fav-label) {
            transform: translateY(110%) translateX(-6px) scale(0.8);
            opacity: 0;
          }
          .input:checked ~ svg {
            fill: #fff;
          }
        }

        &.delete {
          color: #e3616a;
          position: relative;
          &:hover {
            background: #6b2c2b;
          }

          .label {
            transform: translateY(0);
          }

          &:active {
            .label {
              opacity: 0;
              visibility: hidden;
              transform: translateY(100%) translateX(-15px) scale(0.8);
            }
            .action {
              opacity: 1;
              visibility: visible;
              transform: translateY(0);
            }

            &:before {
              animation: delete 2.5s ease-in-out forwards 0.2s;
            }
          }

          .action {
            position: absolute;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-50%) translateX(-15px) scale(0.8);
          }

          &::before {
            content: "";
            position: absolute;
            background-color: #89302d;
            left: 0;
            top: 0;
            height: 100%;
          }
        }

        &.rename {
          &:has(.toogler:checked:nth-of-type(1)) {
            background-color: #333333;
            overflow: hidden;
            .label {
              opacity: 0;
              transform: translateY(100%);
            }
            > svg {
              transform: translateY(130%);
            }

            .input-container {
              transform: translateY(0);

              .icons {
                top: 50%;
              }
            }
          }

          .toogler {
            position: absolute;
            appearance: none;
            width: 100%;
            height: 100%;
          }

          .input-container {
            transform: translateY(-100%);
            width: 100%;
            position: absolute;

            .input {
              width: 75%;
              background: transparent;
              border: none;
              outline: none;
              height: 100%;
              color: #fff;
              padding: 8px 8px;
              font-size: 17px;
              z-index: 100;
            }

            .icons {
              position: absolute;
              top: -50%;
              right: 0%;
              transform: translate(-50%, -50%);
              display: flex;
              justify-content: center;
              align-items: center;
              transition: all 0.3s ease;
              gap: 8px;
              svg {
                background-color: #565656;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.3s ease;
                &:hover {
                  background-color: #757575;
                }
              }
            }
          }
        }
      }
    }
  }

  @keyframes delete {
    from {
      width: 0%;
    }

    to {
      width: 100%;
    }
`

export default DocumentsSection;