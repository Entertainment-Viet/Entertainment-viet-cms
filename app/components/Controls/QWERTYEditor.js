import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  & > .tox-tinymce {
    border-radius: 12px !important;
  }
  .tox-statusbar__branding {
    display: none !important;
  }
`;

const QWERTYEditor = React.forwardRef((props, ref) => (
  <Wrapper>
    <Editor
      textareaName={props.name}
      apiKey="2fncnpfezg0ww0q8x0qxrd7bfo8t8qxgm474mad34s4zew31"
      initialValue={props.val}
      onInit={(_evt, editor) => {
        // eslint-disable-next-line no-param-reassign
        ref.current = editor;
      }}
      init={{
        content_style: `body { background: rgba(159, 154, 203, 0.2); }`,
        height: 428,
        plugins: [
          'advlist autolink link image lists charmap hr anchor ',
          'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
          'table emoticons template paste help',
        ],
        toolbar:
          'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | link image| ' +
          'forecolor backcolor emoticons | help',
        menu: {
          favs: {
            items: 'code visualaid | searchreplace | emoticons',
          },
        },
        menubar: 'favs file edit view insert format tools table help',
      }}
    />
  </Wrapper>
));

QWERTYEditor.propTypes = {
  name: PropTypes.string,
  val: PropTypes.any,
};
export default QWERTYEditor;
