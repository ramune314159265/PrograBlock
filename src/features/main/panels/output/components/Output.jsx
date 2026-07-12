import { Box } from '@chakra-ui/react'
import { WebContainer } from '@webcontainer/api'
import { FitAddon } from '@xterm/addon-fit'
import { Terminal } from '@xterm/xterm'
import '@xterm/xterm/css/xterm.css'
import { useEffect, useRef } from 'react'

export const Output = () => {
	const containerRef = useRef(null)
	const termRef = useRef()
	const webContainerRef = useRef(null)
	useEffect(() => {
		if (!containerRef.current || termRef.current) {
			return
		}

		termRef.current = new Terminal()
		const fitAddon = new FitAddon()
		termRef.current.loadAddon(fitAddon)
		termRef.current.open(containerRef.current)
		const resizeObserver = new ResizeObserver(() => {
			fitAddon.fit()
		})
		resizeObserver.observe(containerRef.current)
	})
	useEffect(() => {
		if (webContainerRef.current || !termRef.current) {
			return
		}
		webContainerRef.current = 1;

		(async () => {
			webContainerRef.current = await WebContainer.boot()
			const files = {
				'index.js': {
					file: {
						contents: 'console.log("123")'
					}
				}
			}
			webContainerRef.current.mount(files)
			const process = await webContainerRef.current.spawn('node', ['index.js'])
			process.output.pipeTo(
				new WritableStream({
					write(data) {
						termRef.current.write(data);
					},
				})
			)
		})()
	})

	return (
		<Box
			ref={containerRef}
			width='full'
			height='full'
			overflow='hidden'
		>
		</Box>
	)
}
