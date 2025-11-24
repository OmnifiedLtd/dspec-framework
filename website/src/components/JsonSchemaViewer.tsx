import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Wrapper to handle server-side rendering issues with some libraries
export default function JsonSchemaViewerWrapper(props: any) {
  return (
    <BrowserOnly fallback={<div>Loading schema viewer...</div>}>
      {() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { JsonSchemaViewer } = require('@stoplight/json-schema-viewer');
        require('@stoplight/json-schema-viewer/styles.css'); // Ensure styles are loaded
        
        return (
          <div className="json-schema-viewer-wrapper my-8 p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <JsonSchemaViewer {...props} />
          </div>
        );
      }}
    </BrowserOnly>
  );
}
