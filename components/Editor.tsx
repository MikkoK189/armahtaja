'use client';
// You can use this code in a separate component that's imported in your pages.
import { UndoRedo, type CodeBlockEditorDescriptor, BoldItalicUnderlineToggles } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import React from 'react';
const { MDXEditor , codeBlockPlugin, headingsPlugin, listsPlugin, linkPlugin, quotePlugin, markdownShortcutPlugin, useCodeBlockEditorContext, toolbarPlugin } = await import('@mdxeditor/editor')
import editorStyle from '../styles/editor.module.css'

const PlainTextCodeEditorDescriptor: CodeBlockEditorDescriptor = {
  match: () => true,
  priority: 0,
  Editor: (props) => {
    const cb = useCodeBlockEditorContext()
    return (
      <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <textarea rows={3} cols={20} defaultValue={props.code} onChange={(e) => cb.setCode(e.target.value)} />
      </div>
    )
  }
}

const Editor = (props: any) => {
    return <MDXEditor 
      className={editorStyle.editor}
      onChange={props.onChange}
      markdown={props.content}
      plugins={[
        codeBlockPlugin({ codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor] }),
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          )
        })

      ]}
    />
}

export default Editor