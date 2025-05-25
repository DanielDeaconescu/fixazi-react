import styled from "styled-components";
import { FiPaperclip } from "react-icons/fi";

const FilePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 100%;
`;

const FileImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: contain;
`;

const FileLink = styled.a`
  color: ${({ $isCustomer }) => ($isCustomer ? "#bfdbfe" : "#94a3b8")};
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;
function FilePreview({ fileUrl, fileType, fileName, isCustomer }) {
  const isImage = fileType.startsWith("image/");

  return (
    <FilePreviewContainer>
      {isImage ? (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
          <FileImage src={fileUrl} alt="Uploaded content" />
        </a>
      ) : (
        <FileLink
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          $isCustomer={isCustomer}
        >
          <FiPaperclip size={16} />
          {fileName}
        </FileLink>
      )}
    </FilePreviewContainer>
  );
}

export default FilePreview;
