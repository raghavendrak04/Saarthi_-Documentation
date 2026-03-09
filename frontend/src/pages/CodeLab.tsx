import { useState } from 'react';
import { Play, RotateCcw, Copy, Check, ChevronDown, Terminal, Activity, FileText } from 'lucide-react';
import GraphOutput from '../components/GraphOutput';
import './CodeLab.css';

const LANGUAGES = ['python', 'matlab', 'julia'];
const STARTER_CODE: Record<string, string> = {
    python: `import numpy as np
import scipy.signal as signal
import matplotlib.pyplot as plt

# Design Butterworth Low-Pass Filter
order = 4
cutoff_freq = 1000  # Hz
sampling_rate = 8000 # Hz

# Normalize frequency
nyquist = 0.5 * sampling_rate
normal_cutoff = cutoff_freq / nyquist

# Get filter coefficients
b, a = signal.butter(order, normal_cutoff, btype='low', analog=False)

# Compute frequency response
w, h = signal.freqz(b, a, fs=sampling_rate)

# Plot
plt.figure()
plt.plot(w, 20 * np.log10(abs(h)))
plt.title('Butterworth Filter Frequency Response')
plt.xlabel('Frequency [Hz]')
plt.ylabel('Magnitude [dB]')
plt.grid()
plt.show()`,
    matlab: `% Design Butterworth Low-Pass Filter
order = 4;
cutoff_freq = 1000; % Hz
fs = 8000; % Hz

[b, a] = butter(order, cutoff_freq/(fs/2), 'low');

freqz(b, a, 512, fs);
title('Butterworth Filter Frequency Response');`,
    julia: `using DSP
using Plots

order = 4
cutoff_freq = 1000
fs = 8000

responsetype = Lowpass(cutoff_freq; fs=fs)
design = Butterworth(order)
filter = digitalfilter(responsetype, design)

w = range(0, stop=fs/2, length=512)
h = freqz(filter, w, fs)

plot(w, 20*log10.(abs.(h)), title="Butterworth Filter Response")`
};

export default function CodeLabPage() {
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState(STARTER_CODE['python']);
    const [output, setOutput] = useState('Click "Run Code" to execute...');
    const [isRunning, setIsRunning] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [activeTab, setActiveTab] = useState<'console' | 'graph'>('console');
    const [showGraph, setShowGraph] = useState(false);
    const [graphData, setGraphData] = useState<{ freq: number; mag: number }[]>([]);

    const generateGraphData = () => {
        const data = [];
        const cutoff = 1000;
        const order = 4;

        for (let f = 0; f <= 4000; f += 50) {
            // Simulate Butterworth LPF magnitude response
            // H(f) = 1 / sqrt(1 + (f/fc)^(2n))
            const mag = 1 / Math.sqrt(1 + Math.pow(f / cutoff, 2 * order));
            const db = 20 * Math.log10(mag);
            data.push({ freq: f, mag: db });
        }
        return data;
    };

    const runCode = async () => {
        setIsRunning(true);
        setOutput('Initializing Python 3.12 environment...\nImporting numpy, scipy, matplotlib...\n');

        // Simulate execution delay
        setTimeout(() => {
            setOutput((prev) => prev + 'Calculating filter coefficients...\nGenerating frequency response...\n\n✅ Execution completed successfully (0.42s)\n[Graph generated]');
            setGraphData(generateGraphData());
            setShowGraph(true);
            setActiveTab('graph');
            setIsRunning(false);
        }, 1500);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const changeLang = (lang: string) => {
        setLanguage(lang);
        setCode(STARTER_CODE[lang]);
        setShowLangDropdown(false);
        setOutput('Click "Run Code" to execute...');
        setShowGraph(false);
        setActiveTab('console');
    };

    return (
        <div className="codelab-page">
            {/* Problem Panel */}
            <div className="codelab-problem">
                <div className="codelab-problem-header">
                    <div>
                        <h2>Filter Design</h2>
                        <span className="text-xs text-gray-500">DSP Module 3</span>
                    </div>
                </div>
                <div className="codelab-problem-body">
                    <div className="problem-meta">
                        <span className="badge badge-warning">Medium</span>
                        <span className="text-xs text-gray-500">Points: 50</span>
                    </div>

                    <p>Create a program to plot the frequency response of a low-pass Butterworth filter.</p>

                    <h4>Requirements:</h4>
                    <ul>
                        <li><strong>Order:</strong> 4</li>
                        <li><strong>Cutoff Frequency:</strong> 1000 Hz</li>
                        <li><strong>Sampling Rate:</strong> 8000 Hz</li>
                        <li><strong>Plot:</strong> Magnitude Response (dB vs Hz)</li>
                    </ul>

                    <h4>Expected Output:</h4>
                    <ul>
                        <li>Bode plot showing magnitude vs frequency</li>
                        <li>-3dB point exactly at 1000 Hz</li>
                        <li>-20dB/decade roll-off after cutoff</li>
                    </ul>

                    <div className="codelab-buttons-stack">
                        <button className="btn btn-outline btn-sm w-full gap-2">
                            <FileText size={14} /> Read Solution
                        </button>
                        <button className="btn btn-outline btn-sm w-full gap-2" onClick={() => {
                            setGraphData(generateGraphData());
                            setShowGraph(true);
                            setActiveTab('graph');
                        }}>
                            <Activity size={14} /> Show Graph Template
                        </button>
                    </div>

                    <h4>Hints:</h4>
                    <div className="codelab-hint">
                        <p>Use <code>scipy.signal.butter</code> to design the filter and <code>scipy.signal.freqz</code> to compute reliability.</p>
                    </div>
                </div>
            </div>

            {/* Editor Panel */}
            <div className="codelab-editor-panel">
                {/* Toolbar */}
                <div className="codelab-toolbar">
                    <div className="codelab-lang-selector">
                        <button className="codelab-lang-btn" onClick={() => setShowLangDropdown(!showLangDropdown)}>
                            <span className={`lang-icon lang-${language}`}></span>
                            {language.charAt(0).toUpperCase() + language.slice(1)} <ChevronDown size={14} />
                        </button>
                        {showLangDropdown && (
                            <div className="codelab-lang-dropdown animate-scale-in">
                                {LANGUAGES.map((l) => (
                                    <button key={l} className={l === language ? 'active' : ''} onClick={() => changeLang(l)}>
                                        {l.charAt(0).toUpperCase() + l.slice(1)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="codelab-toolbar-actions">
                        <button className="btn btn-ghost btn-sm" onClick={copyCode}>
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setCode(STARTER_CODE[language])}>
                            <RotateCcw size={14} /> Reset
                        </button>
                        <button className={`btn btn-success btn-sm ${isRunning ? 'opacity-80' : ''}`} onClick={runCode} disabled={isRunning}>
                            <Play size={14} className={isRunning ? 'animate-spin' : ''} /> {isRunning ? 'Running...' : 'Run Code'}
                        </button>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="codelab-editor">
                    <div className="codelab-line-numbers">
                        {code.split('\n').map((_, i) => <span key={i}>{i + 1}</span>)}
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="codelab-textarea"
                        spellCheck={false}
                    />
                </div>

                {/* Output Area (Tabs + Content) */}
                <div className={`codelab-output-section ${activeTab === 'graph' ? 'expanded' : ''}`}>
                    <div className="codelab-output-tabs">
                        <button
                            className={`output-tab ${activeTab === 'console' ? 'active' : ''}`}
                            onClick={() => setActiveTab('console')}
                        >
                            <Terminal size={14} /> Console
                        </button>
                        <button
                            className={`output-tab ${activeTab === 'graph' ? 'active' : ''}`}
                            onClick={() => setActiveTab('graph')}
                        >
                            <Activity size={14} /> Graph Output
                            {showGraph && <span className="w-2 h-2 rounded-full bg-green-500 ml-2 animate-pulse"></span>}
                        </button>
                    </div>

                    <div className="codelab-output-content">
                        {activeTab === 'console' ? (
                            <pre className="codelab-console-text">{output}</pre>
                        ) : (
                            showGraph ? (
                                <GraphOutput data={graphData} cutoff={1000} />
                            ) : (
                                <div className="graph-placeholder">
                                    <Activity size={48} className="text-gray-700 mb-4" />
                                    <p className="text-gray-500">Run the code to generate visualization</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
