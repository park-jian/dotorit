import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import type { FileRepository } from '@ckeditor/ckeditor5-upload';
import type { Editor as CKEditorType } from '@ckeditor/ckeditor5-core';
import '../styles/editor-styles.css';
import { useRef } from 'react';

interface EditorProps {
 initialData?: string;
 onChange?: (data: string) => void;
 onImageUpload?: (file: File) => Promise<string>;
}

interface FileLoader {
 file: Promise<File>;
}

interface UploadResponse {
 default: string;
 [key: string]: string;
}

interface UploadAdapter {
 upload(): Promise<UploadResponse>;
 abort(): void;
}
const Editor = ({ initialData = '', onChange, onImageUpload }: EditorProps) => {
  const editorRef = useRef<CKEditorType | null>(null);

 return (
  <div className="document-editor">
    <div className="document-editor__toolbar"></div>
    <div className="document-editor__editable-container">
   <CKEditor
     editor={DecoupledEditor}
     data={initialData}
     onReady={(editor) => {
      // 에러 해결을 위해 editor 타입 명시적 정의
      const editorInstance: DecoupledEditor = editor;
      editorRef.current = editorInstance;
       
       const createUploadAdapter = (loader: FileLoader): UploadAdapter => ({
        upload: async () => {
          try {
            const file = await loader.file;
            const tempUrl = URL.createObjectURL(file);
      
            // unload 이벤트에서 URL 해제
            window.addEventListener('unload', () => {
              URL.revokeObjectURL(tempUrl);
            });
      
            return {
              default: tempUrl
            };
          } catch (error) {
            console.error('이미지 업로드 실패:', error);
            throw error;
          }
        },
         abort: () => {
           // 업로드 중단 로직
         }
       });

       const fileRepository = editor.plugins.get('FileRepository') as unknown as FileRepository;
       fileRepository.createUploadAdapter = createUploadAdapter;

       // DecoupledEditor는 툴바를 직접 추가해야 합니다
       const toolbarContainer = document.querySelector('.document-editor__toolbar');
       if (toolbarContainer) {
         toolbarContainer.appendChild(editor.ui.view.toolbar.element!);
       }
     }}
     onChange={(_event, editor) => {
       const data = editor.getData();
       onChange?.(data);
     }}
     config={{
       toolbar: {
         items: [
           'heading',
           '|',
           'fontSize',
           'fontColor',
           'fontBackgroundColor',
           'todoList',
           'outdent',
           'indent',
           'bold',
           'italic',
           'link',
           '|',
           'imageUpload',
           'blockQuote',
           'insertTable',
           '|',
           'undo',
           'redo',
         ],
         shouldNotGroupWhenFull: true
       },
       fontSize: {
         options: [
           9,
           11,
           13,
           'default',
           17,
           19,
           21
         ]
       },
       fontColor: {
         colors: [
           {
             color: 'rgb(0, 0, 0)',
             label: 'Black'
           },
           {
             color: 'rgb(255, 0, 0)',
             label: 'Red'
           },
           {
             color: 'rgb(0, 0, 255)',
             label: 'Blue'
           },
           {
             color: 'rgb(0, 255, 0)',
             label: 'Green'
           }
         ]
       },
       fontBackgroundColor: {
         colors: [
           {
             color: 'rgb(255, 255, 255)',
             label: 'White'
           },
           {
             color: 'rgb(255, 255, 0)',
             label: 'Yellow'
           }
         ]
       },
       image: {
         toolbar: [
           'imageStyle:inline',
           'imageStyle:block',
           'imageStyle:side',
           '|',
           'imageTextAlternative'
         ]
       }
     }}
   />
   </div>
  </div>
 );
};

export default Editor;