import { NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

// Define handmade-style color schemes
const colorSchemes = [
  {
    primary: rgb(0.4, 0.2, 0.1),    // Vintage Brown
    secondary: rgb(0.9, 0.85, 0.8),  // Cream
    accent: rgb(0.7, 0.5, 0.3),      // Light Brown
    light: rgb(0.98, 0.96, 0.94),    // Off White
    dark: rgb(0.2, 0.1, 0.05),       // Dark Brown
    border: rgb(0.8, 0.7, 0.6),      // Kraft Paper
  },
  {
    primary: rgb(0.2, 0.3, 0.4),     // Navy Blue
    secondary: rgb(0.9, 0.9, 0.85),   // Antique White
    accent: rgb(0.6, 0.5, 0.4),      // Taupe
    light: rgb(0.97, 0.97, 0.95),    // Pearl
    dark: rgb(0.15, 0.2, 0.25),      // Dark Navy
    border: rgb(0.75, 0.8, 0.85),    // Slate
  },
  {
    primary: rgb(0.3, 0.35, 0.3),    // Forest Green
    secondary: rgb(0.85, 0.9, 0.85),  // Sage
    accent: rgb(0.5, 0.55, 0.5),     // Moss
    light: rgb(0.95, 0.97, 0.95),    // Mint White
    dark: rgb(0.15, 0.2, 0.15),      // Deep Forest
    border: rgb(0.7, 0.75, 0.7),     // Olive
  },
  {
    primary: rgb(0.4, 0.3, 0.35),    // Plum
    secondary: rgb(0.9, 0.85, 0.9),  // Lavender White
    accent: rgb(0.6, 0.5, 0.55),     // Mauve
    light: rgb(0.97, 0.95, 0.97),    // Lilac White
    dark: rgb(0.25, 0.2, 0.25),      // Deep Purple
    border: rgb(0.8, 0.75, 0.8),     // Dusty Rose
  }
]

// Define handmade-style patterns
const coverPatterns = [
  // Sketchy circles
  (page, colors, center) => {
    for (let i = 0; i < 20; i++) {
      const radius = 10 + i * 15
      const segments = 36
      let lastX = center.x + radius
      let lastY = center.y
      
      for (let j = 1; j <= segments; j++) {
        const angle = (j * 2 * Math.PI) / segments
        const wobble = Math.random() * 5 - 2.5
        const x = center.x + (radius + wobble) * Math.cos(angle)
        const y = center.y + (radius + wobble) * Math.sin(angle)
        
        page.drawLine({
          start: { x: lastX, y: lastY },
          end: { x, y },
          thickness: 0.5,
          color: colors.secondary,
          opacity: 0.5
        })
        
        lastX = x
        lastY = y
      }
    }
  },
  
  // Crosshatch pattern
  (page, colors, center) => {
    const size = 300
    const spacing = 10
    const wobble = 3
    
    // Diagonal lines one way
    for (let i = -size; i < size; i += spacing) {
      const startX = center.x - size + i
      const startY = center.y - size
      const endX = center.x + size + i
      const endY = center.y + size
      
      for (let j = 0; j < 2; j++) {
        page.drawLine({
          start: { 
            x: startX + Math.random() * wobble, 
            y: startY + Math.random() * wobble 
          },
          end: { 
            x: endX + Math.random() * wobble, 
            y: endY + Math.random() * wobble 
          },
          thickness: 0.2,
          color: colors.secondary,
          opacity: 0.3
        })
      }
    }
    
    // Diagonal lines other way
    for (let i = -size; i < size; i += spacing) {
      const startX = center.x + size - i
      const startY = center.y - size
      const endX = center.x - size - i
      const endY = center.y + size
      
      for (let j = 0; j < 2; j++) {
        page.drawLine({
          start: { 
            x: startX + Math.random() * wobble, 
            y: startY + Math.random() * wobble 
          },
          end: { 
            x: endX + Math.random() * wobble, 
            y: endY + Math.random() * wobble 
          },
          thickness: 0.2,
          color: colors.secondary,
          opacity: 0.3
        })
      }
    }
  },
  
  // Doodle flowers
  (page, colors, center) => {
    for (let i = 0; i < 30; i++) {
      const x = center.x + (Math.random() * 400 - 200)
      const y = center.y + (Math.random() * 400 - 200)
      const size = 5 + Math.random() * 15
      
      // Draw petals
      for (let j = 0; j < 6; j++) {
        const angle = (j * 2 * Math.PI) / 6
        const petalX = x + size * Math.cos(angle)
        const petalY = y + size * Math.sin(angle)
        
        page.drawLine({
          start: { x, y },
          end: { x: petalX, y: petalY },
          thickness: 0.5,
          color: colors.secondary,
          opacity: 0.4
        })
      }
      
      // Draw center
      page.drawCircle({
        x,
        y,
        size: 2,
        color: colors.accent,
        opacity: 0.5
      })
    }
  }
]

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    )
  }

  try {
    if (!req.body) {
      throw new Error('Request body is empty')
    }

    const { prompt, name, school, major, className } = await req.json()

    if (!prompt || !name) {
      return NextResponse.json(
        { error: 'Prompt and name are required' },
        { status: 400 }
      )
    }

    // Randomly select color scheme and pattern
    const colors = colorSchemes[Math.floor(Math.random() * colorSchemes.length)]
    const pattern = coverPatterns[Math.floor(Math.random() * coverPatterns.length)]

    const pdfDoc = await PDFDocument.create()
    const coverPage = pdfDoc.addPage([600, 800])
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // Random gradient direction
    const gradientAngle = Math.random() * Math.PI * 2
    for (let i = 0; i < 800; i += 2) {
      const x1 = Math.cos(gradientAngle) * i
      const y1 = Math.sin(gradientAngle) * i
      coverPage.drawLine({
        start: { x: x1, y: y1 },
        end: { x: x1 + 600, y: y1 },
        thickness: 2,
        color: rgb(
          0.98 - i/2000 + Math.random()*0.02,
          0.95 - i/1800 + Math.random()*0.02,
          0.90 - i/1600 + Math.random()*0.02
        ),
      })
    }

    // Random border style
    const borderWidth = 15 + Math.random() * 10
    const margin = 25 + Math.random() * 10
    
    for (let i = 0; i < borderWidth; i++) {
      coverPage.drawRectangle({
        x: margin + i,
        y: margin + i,
        width: 600 - 2 * (margin + i),
        height: 800 - 2 * (margin + i),
        borderColor: rgb(
          0.8 - i/50 + Math.random()*0.05,
          0.7 - i/50 + Math.random()*0.05,
          0.5 - i/50 + Math.random()*0.05
        ),
        borderWidth: 0.5,
      })
    }

    // Apply random pattern
    pattern(coverPage, colors, { x: 300, y: 400 })

    // Random title box position
    const titleY = 500 + Math.random() * 100
    coverPage.drawRectangle({
      x: 100,
      y: titleY,
      width: 400,
      height: 100,
      color: colors.light,
    })

    // Add title with random styling
    const titleOffset = Math.random() * 20
    ;['NOTEBOOK'].forEach((text, index) => {
      const y = titleY + 20 + titleOffset
      const size = 36
      
      // Shadow with random offset
      const shadowOffset = 1 + Math.random()
      coverPage.drawText(text, {
        x: 201,
        y: y - shadowOffset,
        size,
        font: helveticaBold,
        color: colors.secondary,
      })
      
      coverPage.drawText(text, {
        x: 200,
        y,
        size,
        font: helveticaBold,
        color: colors.primary,
      })
    })

    // Add student information
    const infoStartY = titleY - 80
    const infoSpacing = 30

    // Add name
    coverPage.drawText('Name:', {
      x: 150,
      y: infoStartY,
      size: 14,
      font: helveticaBold,
      color: colors.dark,
    })
    coverPage.drawText(name || '', {
      x: 220,
      y: infoStartY,
      size: 14,
      font: helveticaFont,
      color: colors.primary,
    })

    // Add school
    coverPage.drawText('School:', {
      x: 150,
      y: infoStartY - infoSpacing,
      size: 14,
      font: helveticaBold,
      color: colors.dark,
    })
    coverPage.drawText(school || '', {
      x: 220,
      y: infoStartY - infoSpacing,
      size: 14,
      font: helveticaFont,
      color: colors.primary,
    })

    // Add major
    coverPage.drawText('Major:', {
      x: 150,
      y: infoStartY - (infoSpacing * 2),
      size: 14,
      font: helveticaBold,
      color: colors.dark,
    })
    coverPage.drawText(major || '', {
      x: 220,
      y: infoStartY - (infoSpacing * 2),
      size: 14,
      font: helveticaFont,
      color: colors.primary,
    })

    // Add class name
    coverPage.drawText('Class:', {
      x: 150,
      y: infoStartY - (infoSpacing * 3),
      size: 14,
      font: helveticaBold,
      color: colors.dark,
    })
    coverPage.drawText(className || '', {
      x: 220,
      y: infoStartY - (infoSpacing * 3),
      size: 14,
      font: helveticaFont,
      color: colors.primary,
    })

    // Add decorative line under information
    coverPage.drawLine({
      start: { x: 150, y: infoStartY - (infoSpacing * 3.5) },
      end: { x: 450, y: infoStartY - (infoSpacing * 3.5) },
      thickness: 1,
      color: colors.secondary,
    })

    // Add subtitle (prompt) with random styling
    coverPage.drawText(prompt, {
      x: 150,
      y: infoStartY - (infoSpacing * 4.5),
      size: 12 + Math.random() * 4,
      font: timesRoman,
      color: colors.dark,
      maxWidth: 300,
    })

    // Add pages with randomized design elements
    for (let i = 0; i < 30; i++) {
      const page = pdfDoc.addPage([600, 800])
      
      // Random line spacing
      const lineSpacing = 23 + Math.random() * 4
      
      // Random margin
      const pageMargin = 45 + Math.random() * 10
      
      for (let y = 750; y > 50; y -= lineSpacing) {
        page.drawLine({
          start: { x: pageMargin, y },
          end: { x: 550, y },
          thickness: 0.2 + Math.random() * 0.2,
          color: colors.border,
        })
      }

      // Random page number position
      const pageNumX = 520 + Math.random() * 40
      const pageNumY = 15 + Math.random() * 10
      
      page.drawText(`${i + 1}`, {
        x: pageNumX,
        y: pageNumY,
        size: 9 + Math.random(),
        font: timesRoman,
        color: colors.primary,
      })
    }

    // Add back cover
    const backCover = pdfDoc.addPage([600, 800])
    
    // Apply same gradient as front cover but reversed
    const backGradientAngle = gradientAngle + Math.PI
    for (let i = 0; i < 800; i += 2) {
      const x1 = Math.cos(backGradientAngle) * i
      const y1 = Math.sin(backGradientAngle) * i
      backCover.drawLine({
        start: { x: x1, y: y1 },
        end: { x: x1 + 600, y: y1 },
        thickness: 2,
        color: rgb(
          0.95 - i/2000 + Math.random()*0.02,
          0.92 - i/1800 + Math.random()*0.02,
          0.87 - i/1600 + Math.random()*0.02
        ),
      })
    }

    // Add matching border to back cover
    for (let i = 0; i < borderWidth; i++) {
      backCover.drawRectangle({
        x: margin + i,
        y: margin + i,
        width: 600 - 2 * (margin + i),
        height: 800 - 2 * (margin + i),
        borderColor: rgb(
          Math.max(0, Math.min(1, 0.7 - i/100 + Math.random()*0.05)),
          Math.max(0, Math.min(1, 0.6 - i/100 + Math.random()*0.05)),
          Math.max(0, Math.min(1, 0.4 - i/100 + Math.random()*0.05))
        ),
        borderWidth: 0.5,
      })
    }

    // Apply matching pattern but with reduced opacity
    pattern(backCover, {
      ...colors,
      secondary: rgb(
        Math.max(0, Math.min(1, 0.7)),
        Math.max(0, Math.min(1, 0.7)),
        Math.max(0, Math.min(1, 0.7))
      )
    }, { x: 300, y: 400 })

    // Add decorative elements specific to back cover
    // Center emblem
    backCover.drawCircle({
      x: 300,
      y: 400,
      size: 60,
      borderColor: colors.primary,
      borderWidth: 2,
    })

    backCover.drawCircle({
      x: 300,
      y: 400,
      size: 40,
      borderColor: colors.secondary,
      borderWidth: 1,
    })

    // Add current year
    const currentYear = new Date().getFullYear()
    backCover.drawText(currentYear.toString(), {
      x: 285,
      y: 393,
      size: 16,
      font: timesRoman,
      color: colors.primary,
    })

    // Add footer text
    const footerTexts = [
      'Handcrafted with Care',
      'Premium Quality',
      'Made Just for You'
    ]
    const randomFooter = footerTexts[Math.floor(Math.random() * footerTexts.length)]
    
    backCover.drawText(randomFooter, {
      x: 300 - (randomFooter.length * 4),
      y: 100,
      size: 14,
      font: helveticaFont,
      color: colors.primary,
    })

    // Add copyright notice
    backCover.drawText(`© ${currentYear} All Rights Reserved`, {
      x: 240,
      y: 50,
      size: 10,
      font: helveticaFont,
      color: colors.dark,
    })

    // Add decorative corners on back cover
    const cornerSize = 40
    const corners = [
      { x: margin, y: margin },
      { x: 600 - margin - cornerSize, y: margin },
      { x: margin, y: 800 - margin - cornerSize },
      { x: 600 - margin - cornerSize, y: 800 - margin - cornerSize },
    ]

    corners.forEach(corner => {
      // Draw corner flourish
      backCover.drawLine({
        start: { x: corner.x, y: corner.y + cornerSize },
        end: { x: corner.x + cornerSize, y: corner.y },
        thickness: 1,
        color: colors.secondary,
      })

      backCover.drawLine({
        start: { x: corner.x + 5, y: corner.y + cornerSize - 5 },
        end: { x: corner.x + cornerSize - 5, y: corner.y + 5 },
        thickness: 0.5,
        color: colors.accent,
      })
    })

    // Add subtle texture to back cover
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 600
      const y = Math.random() * 800
      backCover.drawCircle({
        x,
        y,
        size: 0.5,
        color: rgb(0.1, 0.1, 0.1)
      })
    }

    const pdfBytes = await pdfDoc.save()
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64')
    const pdfUrl = `data:application/pdf;base64,${pdfBase64}`

    return new NextResponse(
      JSON.stringify({ pdfUrl }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    
  } catch (error) {
    console.error('Error generating notebook:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Failed to generate notebook' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

export async function GET() {
  return new NextResponse(
    JSON.stringify({ error: 'Method not allowed' }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
} 