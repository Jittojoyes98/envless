import { NextSeo } from "next-seo";
import Zoom from "react-medium-image-zoom";
import { RenderBlocks } from "@/components/blog/ContentBlock";
import Nav from "@/components/static/Nav";
import Container from "@/components/theme/Container";

type Props = {
  post: any;
  blocks: any;
};

const Article: React.FC<Props> = ({ post, blocks }) => {
  const postImageUrl = () => {
    const postImage = post?.properties["Cover Image"].files[0];
    return postImage?.type === "file"
      ? postImage?.file?.url
      : postImage?.external?.url;
  };

  const postTitle = () => {
    return post?.properties.Post.title[0].plain_text;
  };

  const postDate = () => {
    const date = post.properties.Date.date.start;

    if (date === undefined) {
      return "";
    } else {
      return new Date(post.properties.Date.date.start).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    }
  };

  return (
    <>
      <NextSeo
        title={`Envless - ${postTitle()}`}
        description="Open source, frictionless and secure way to share and manage app secrets across teams."
        canonical="https://envless.dev"
        themeColor="#111"
        openGraph={{
          url: "https://envless.dev",
          description:
            "Open source, frictionless and secure way to share and manage app secrets across teams.",
          images: [{ url: postImageUrl() }],
          siteName: "Envless",
        }}
        twitter={{
          handle: "@envless",
          site: "@envless",
          cardType: "summary_large_image",
        }}
      />

      <Container>
        <Nav />
      </Container>

      <Container>
        <section className="md:px-32">
          <section className="mx-auto my-16 sm:max-w-3xl">
            <h1 className="mt-10 text-center text-5xl">{postTitle()}</h1>
            <p className="text-md my-2 text-center text-light">{postDate()}</p>
            <Zoom>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={postTitle()}
                sizes="80vw"
                src={postImageUrl()}
                decoding="async"
                data-nimg="fill"
                className="my-10 object-cover transition-all"
              />
            </Zoom>
            <RenderBlocks blocks={blocks} />
          </section>
        </section>
      </Container>
    </>
  );
};

export default Article;
