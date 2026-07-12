#!/usr/bin/env python3
"""
Capture screenshots using Playwright for visual analysis.
"""
import argparse
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

async def capture_screenshots(url: str, output_dir: Path, viewport_configs: list):
    """Capture screenshots for multiple viewport configurations."""
    output_dir.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()

        for config in viewport_configs:
            name = config['name']
            width = config['width']
            height = config['height']

            context = await browser.new_context(
                viewport={'width': width, 'height': height},
                device_scale_factor=2 if name == 'mobile' else 1
            )

            page = await context.new_page()

            # Navigate and wait for load
            await page.goto(url, wait_until='networkidle')

            # Wait for images to load
            await page.wait_for_timeout(2000)

            # Full page screenshot
            screenshot_path = output_dir / f'{name}.png'
            await page.screenshot(path=str(screenshot_path), full_page=True)
            print(f"Captured: {screenshot_path}")

            # Above-the-fold screenshot
            above_fold_path = output_dir / f'{name}_above_fold.png'
            await page.screenshot(path=str(above_fold_path), full_page=False)
            print(f"Captured above-fold: {above_fold_path}")

            await context.close()

        await browser.close()

def main():
    parser = argparse.ArgumentParser(description='Capture screenshots for visual analysis')
    parser.add_argument('url', help='URL to capture')
    parser.add_argument('--output', default='screenshots', help='Output directory')
    parser.add_argument('--all', action='store_true', help='Capture all viewports')

    args = parser.parse_args()

    output_dir = Path(args.output)

    viewport_configs = [
        {'name': 'desktop', 'width': 1920, 'height': 1080},
        {'name': 'mobile', 'width': 375, 'height': 812},
    ]

    if args.all:
        viewport_configs.extend([
            {'name': 'laptop', 'width': 1366, 'height': 768},
            {'name': 'tablet', 'width': 768, 'height': 1024},
        ])

    asyncio.run(capture_screenshots(args.url, output_dir, viewport_configs))

if __name__ == '__main__':
    main()
