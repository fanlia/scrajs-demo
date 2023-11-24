
import {basicSetup, EditorView} from "codemirror"
import {EditorState, Compartment} from "@codemirror/state"
import { javascript } from "@codemirror/lang-javascript"

let language = new Compartment, tabSize = new Compartment

export const getEditor = ({
  parent,
  doc,
}) => {
  let state = EditorState.create({
    doc,
    extensions: [
      basicSetup,
      language.of(javascript()),
      tabSize.of(EditorState.tabSize.of(2)),
    ],
  })

  let view = new EditorView({
    state,
    parent,
  })

  const getDoc = () => view.state.doc.toString()
  const setDoc = (doc) => view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: doc }})

  return {
    view,
    getDoc,
    setDoc,
  }
}
