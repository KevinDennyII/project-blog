import React from 'react';

import BlogHero from '@/components/BlogHero';
import CodeSnippet from "@/components/CodeSnippet";

import styles from './postSlug.module.css';
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from 'next-mdx-remote/rsc';
import {BLOG_TITLE} from "@/constants";


export async function generateMetadata({ params }) {
  const blogContent = await loadBlogPost(params.postSlug)
  const {title, abstract } = blogContent.frontmatter;

  return {
    title: `${title} - ${BLOG_TITLE}`,
    description: abstract,
  };
}

async function BlogPost({params}) {

  // grabbing params from dynamic routing
  const {frontmatter, content} = await loadBlogPost(params.postSlug)

  return (
    <article className={styles.wrapper}>
      <BlogHero
        {...frontmatter}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={{
          pre: CodeSnippet,
        }} />
      </div>
    </article>
  );
}

export default BlogPost;
