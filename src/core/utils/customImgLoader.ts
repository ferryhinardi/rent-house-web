// https://github.com/vercel/next.js/discussions/19732#discussioncomment-1136915
const customImgLoader = ({ src }: { src: string }) => {
  return `${src}`;
};

export default customImgLoader;
