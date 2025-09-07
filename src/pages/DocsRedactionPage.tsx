import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Download, 
  Undo2, 
  Trash2, 
  Bot, 
  FileText, 
  Eye, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  BarChart3
} from 'lucide-react';

// Declare mammoth as a global variable
declare global {
  interface Window {
    mammoth: any;
  }
}

interface Suggestion {
  text: string;
  type: string;
  index: number;
}

const DocumentRedactionTool: React.FC = () => {
  const [originalContent, setOriginalContent] = useState<string>('');
  const [currentContent, setCurrentContent] = useState<string>('');
  const [redactionHistory, setRedactionHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [redactionCount, setRedactionCount] = useState<number>(0);
  const [filename, setFilename] = useState<string>('');
  const [selectedText, setSelectedText] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: string } | null>(null);
  const [mammothLoaded, setMammothLoaded] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentViewerRef = useRef<HTMLDivElement>(null);

  // Load mammoth.js on component mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';
    script.onload = () => {
      setMammothLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load mammoth.js');
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const showStatus = useCallback((message: string, type: string) => {
    setStatusMessage({ text: message, type });
    setTimeout(() => setStatusMessage(null), 3000);
  }, []);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!mammothLoaded || !window.mammoth) {
      showStatus('Please wait for the document processor to load...', 'info');
      return;
    }

    const newFilename = file.name.replace('.docx', '');
    setFilename(newFilename);
    
    try {
      showStatus('Loading document...', 'info');
      
      const arrayBuffer = await file.arrayBuffer();
      const result = await window.mammoth.convertToHtml({arrayBuffer: arrayBuffer});
      
      const content = result.value;
      setOriginalContent(content);
      setCurrentContent(content);
      setRedactionCount(0);
      setRedactionHistory([]);
      setSuggestions([]);
      setSelectedText('');
      
      showStatus('Document loaded successfully!', 'success');
    } catch (error) {
      console.error('Error loading document:', error);
      showStatus('Error loading document. Please try again.', 'error');
    }
  }, [mammothLoaded, showStatus]);

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    const selected = selection?.toString().trim() || '';
    setSelectedText(selected);
  }, []);

  const redactSelected = useCallback(() => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    
    if (!selectedText || !documentViewerRef.current) return;

    // Save current state for undo
    setRedactionHistory(prev => [...prev, currentContent]);

    // Create redaction blocks
    const redactionBlocks = '█'.repeat(Math.max(1, Math.ceil(selectedText.length / 3)));
    
    try {
      const range = selection?.getRangeAt(0);
      if (range) {
        const redactedSpan = document.createElement('span');
        redactedSpan.className = 'redacted-text';
        redactedSpan.textContent = redactionBlocks;
        redactedSpan.setAttribute('data-original', selectedText);
        redactedSpan.style.background = '#000';
        redactedSpan.style.color = '#000';
        redactedSpan.style.padding = '2px 4px';
        redactedSpan.style.borderRadius = '2px';
        redactedSpan.style.userSelect = 'none';
        
        range.deleteContents();
        range.insertNode(redactedSpan);
        
        // Update current content
        setCurrentContent(documentViewerRef.current.innerHTML);
        selection?.removeAllRanges();
        setRedactionCount(prev => prev + 1);
        setSelectedText('');
      }
    } catch (error) {
      console.error('Error during redaction:', error);
      showStatus('Error during redaction. Please try again.', 'error');
    }
  }, [currentContent, showStatus]);

  const generateSuggestions = useCallback(() => {
    if (!documentViewerRef.current) return;
    
    const text = documentViewerRef.current.textContent || documentViewerRef.current.innerText || '';
    
    const patterns = [
      { type: 'Email', regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g },
      { type: 'Phone', regex: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g },
      { type: 'SSN', regex: /\b\d{3}-?\d{2}-?\d{4}\b/g },
      { type: 'Date', regex: /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g },
      { type: 'Name', regex: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g }
    ];

    const newSuggestions: Suggestion[] = [];
    
    patterns.forEach(pattern => {
      let match;
      const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
      while ((match = regex.exec(text)) !== null) {
        // Avoid infinite loop
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        newSuggestions.push({
          text: match[0],
          type: pattern.type,
          index: match.index
        });
      }
    });

    // Remove duplicates
    const uniqueSuggestions = newSuggestions.filter((suggestion, index, arr) => 
      arr.findIndex(s => s.text === suggestion.text && s.type === suggestion.type) === index
    );

    setSuggestions(uniqueSuggestions);
  }, []);

  const acceptSuggestion = useCallback((index: number) => {
    const suggestion = suggestions[index];
    if (!documentViewerRef.current || !suggestion) return;
    
    // Save current state for undo
    setRedactionHistory(prev => [...prev, currentContent]);
    
    try {
      // Find and replace the text
      const redactionBlocks = '█'.repeat(Math.max(1, Math.ceil(suggestion.text.length / 3)));
      const redactedSpan = `<span class="redacted-text" data-original="${suggestion.text}" style="background: #000; color: #000; padding: 2px 4px; border-radius: 2px; user-select: none;">${redactionBlocks}</span>`;
      
      const newContent = currentContent.replace(new RegExp(suggestion.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), redactedSpan);
      setCurrentContent(newContent);
      
      setRedactionCount(prev => prev + 1);
      setSuggestions(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error accepting suggestion:', error);
      showStatus('Error applying suggestion. Please try again.', 'error');
    }
  }, [suggestions, currentContent, showStatus]);

  const rejectSuggestion = useCallback((index: number) => {
    setSuggestions(prev => prev.filter((_, i) => i !== index));
  }, []);

  const undoRedaction = useCallback(() => {
    if (redactionHistory.length > 0) {
      const lastState = redactionHistory[redactionHistory.length - 1];
      setCurrentContent(lastState);
      setRedactionHistory(prev => prev.slice(0, -1));
      setRedactionCount(prev => Math.max(0, prev - 1));
    }
  }, [redactionHistory]);

  const clearAllRedactions = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all redactions?')) {
      setCurrentContent(originalContent);
      setRedactionCount(0);
      setRedactionHistory([]);
      setSuggestions([]);
    }
  }, [originalContent]);

  const downloadDocx = useCallback(() => {
    try {
      if (!documentViewerRef.current || !currentContent) {
        showStatus('No document to download', 'error');
        return;
      }
      
      // Create a clean copy of the content for export
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = currentContent;
      
      // Process redacted elements
      const redactedElements = tempDiv.querySelectorAll('.redacted-text');
      redactedElements.forEach(el => {
        const original = el.getAttribute('data-original') || '';
        const blocks = '█'.repeat(Math.max(3, Math.ceil(original.length / 3)));
        el.textContent = blocks;
        (el as HTMLElement).style.backgroundColor = 'transparent';
        (el as HTMLElement).style.color = 'black';
      });
      
      // Create Word-compatible HTML
      const wordCompatibleHtml = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="UTF-8">
<meta name=ProgId content=Word.Document>
<meta name=Generator content="Microsoft Word 15">
<meta name=Originator content="Microsoft Word 15">
<title>${filename}_redacted</title>
<style>
@page WordSection1 {
  size:8.5in 11.0in;
  margin:1.0in 1.0in 1.0in 1.0in;
  mso-header-margin:.5in;
  mso-footer-margin:.5in;
  mso-paper-source:0;
}
div.WordSection1 { page:WordSection1; }
body {
  font-family: "Times New Roman", serif;
  font-size: 12pt;
  line-height: 1.15;
  margin: 0;
}
p { margin: 0; margin-bottom: 8pt; }
strong, b { font-weight: bold; }
em, i { font-style: italic; }
ul, ol { margin-left: 36pt; }
.redacted-text {
  color: black;
  background-color: transparent;
}
</style>
</head>
<body lang=EN-US style='tab-interval:.5in'>
<div class=WordSection1>
${tempDiv.innerHTML}
</div>
</body>
</html>`;

      const blob = new Blob([wordCompatibleHtml], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename || 'document'}_redacted.doc`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showStatus('Document downloaded successfully! The file can be opened in Microsoft Word.', 'success');
      
    } catch (error) {
      console.error('Download error:', error);
      showStatus('Error downloading document. Please try again.', 'error');
    }
  }, [filename, currentContent, showStatus]);

  // Update document viewer when content changes
  useEffect(() => {
    if (documentViewerRef.current) {
      if (currentContent) {
        documentViewerRef.current.innerHTML = currentContent;
      } else {
        documentViewerRef.current.innerHTML = `
          <div class="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center bg-gray-50 transition-all duration-300 hover:border-purple-300 hover:bg-purple-50">
            <div class="text-6xl text-gray-300 mb-6"><svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Upload a Word Document</h3>
            <p class="text-gray-600">Select a .docx file to begin redaction</p>
          </div>
        `;
      }
    }
  }, [currentContent]);

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'error': return <XCircle className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusStyles = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container-custom py-12">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Document Redaction Tool
          </h1>
          <p className="text-xl text-gray-600">
            Securely redact sensitive information from Word documents
          </p>
        </motion.div>

        {/* Status Message */}
        {statusMessage && (
          <motion.div
            className={`mb-8 p-4 rounded-xl border flex items-center space-x-3 ${getStatusStyles(statusMessage.type)}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {getStatusIcon(statusMessage.type)}
            <span className="font-medium">{statusMessage.text}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor Panel */}
          <div className="lg:col-span-3">
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Toolbar */}
              <div className="bg-gray-900 p-6 border-b border-gray-200">
                {/* First Toolbar Row */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!mammothLoaded}
                    className={`btn-primary flex items-center space-x-2 ${!mammothLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Upload className="w-5 h-5" />
                    <span>{mammothLoaded ? 'Upload DOCX' : 'Loading...'}</span>
                  </button>
                  
                  <button
                    disabled={!selectedText}
                    onClick={redactSelected}
                    className={`flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium transition-all hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Eye className="w-5 h-5" />
                    <span>
                      {selectedText ? `Redact "${selectedText.substring(0, 20)}${selectedText.length > 20 ? '...' : ''}"` : 'Redact Selected'}
                    </span>
                  </button>
                  
                  <button
                    disabled={!currentContent}
                    onClick={generateSuggestions}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Bot className="w-5 h-5" />
                    <span>AI Suggestions</span>
                  </button>
                </div>
                
                {/* Second Toolbar Row */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    disabled={!currentContent}
                    onClick={downloadDocx}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download DOCX</span>
                  </button>
                  
                  <button
                    disabled={redactionHistory.length === 0}
                    onClick={undoRedaction}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium transition-all hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Undo2 className="w-5 h-5" />
                    <span>Undo</span>
                  </button>
                  
                  <button
                    disabled={redactionCount === 0}
                    onClick={clearAllRedactions}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium transition-all hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Clear All</span>
                  </button>
                </div>
              </div>
              
              {/* Document Viewer */}
              <div
                ref={documentViewerRef}
                onMouseUp={handleTextSelection}
                className="p-8 min-h-[600px] max-h-[600px] overflow-y-auto bg-white leading-relaxed text-gray-900 cursor-text"
                style={{ fontSize: '15px' }}
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Document Stats */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-900">Document Stats</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className="font-semibold text-gray-900">
                    {currentContent ? 'Document loaded' : 'No document'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Redactions</span>
                  <span className="font-semibold text-purple-600">{redactionCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">File</span>
                  <span className="font-semibold text-gray-900 truncate ml-2" title={filename || 'None'}>
                    {filename || 'None'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* AI Suggestions */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Bot className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-bold text-gray-900">AI Suggestions</h3>
              </div>
              
              {suggestions.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  {currentContent ? 'No sensitive content detected.' : 'Load a document and click "AI Suggestions" to detect sensitive content automatically.'}
                </p>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-900 mb-4">
                    <strong>{suggestions.length}</strong> potential items found:
                  </p>
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="font-medium text-gray-900 mb-1">
                        "{suggestion.text}"
                      </div>
                      <div className="text-xs text-gray-500 mb-3">
                        {suggestion.type}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => acceptSuggestion(index)}
                          className="px-3 py-1 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Redact
                        </button>
                        <button
                          onClick={() => rejectSuggestion(index)}
                          className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Ignore
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Instructions */}
            <motion.div
              className="bg-purple-50 rounded-2xl p-6 border border-purple-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-start space-x-3">
                <FileText className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-purple-900 mb-3">How to Use</h4>
                  <ol className="text-sm text-purple-700 space-y-1">
                    <li>1. Upload a .docx file</li>
                    <li>2. Select text to redact manually</li>
                    <li>3. Use AI suggestions for automatic detection</li>
                    <li>4. Download your redacted document</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentRedactionTool;
