const ImageNumber = ({
  src,
  alt,
  content,
}: {
  src: string;
  alt: string;
  content: number | string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        placeItems: "center",
        marginRight: "12px",
        flex: 1,
      }}
    >
      <img src={src} alt={alt} style={{ marginRight: "6px" }} /> : {content}
    </div>
  );
};

export default ImageNumber;
