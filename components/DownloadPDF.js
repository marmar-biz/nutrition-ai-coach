// components/DownloadPDF.js
import Script from 'next/script'

export default function DownloadPDF({ plan, meta }) {
  const onMake = async () => {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const line = (y) => { doc.setDrawColor(240); doc.line(48, y, 547, y) }

    doc.setFont('helvetica','bold'); doc.setFontSize(18)
    doc.text('Nutrition AI Coach — برنامه هفتگی', 48, 64)
    doc.setFont('helvetica','normal'); doc.setFontSize(11)
    doc.text(`هدف: ${meta.goal}   |   کالری: ${meta.calories}   |   رژیم: ${meta.diet}`, 48, 84)
    line(96)

    let y = 120
    plan.days.forEach((d, dayIdx) => {
      doc.setFont('helvetica','bold'); doc.setFontSize(14)
      doc.text(`روز ${dayIdx + 1} — کالری کل: ${d.total} / آب: ${d.water} لیتر`, 48, y); y += 16
      doc.setFont('helvetica','normal'); doc.setFontSize(12)

      d.meals.forEach((m) => {
        const foods = m.foods.join(' + ')
        const tip = `نکته: ${m.tip}`
        doc.text(`${m.time}  •  ${m.title}  (${m.kcal} کالری)`, 56, y); y += 16
        ;[foods, tip].forEach(txt => {
          const lines = doc.splitTextToSize(txt, 495)
          lines.forEach(lineTxt => { doc.text(lineTxt, 64, y); y += 14 })
        })
        y += 6
        if (y > 760) { doc.addPage(); y = 64 }
      })

      line(y); y += 20
      if (y > 760) { doc.addPage(); y = 64 }
    })

    doc.setFontSize(10); doc.setTextColor(120)
    doc.text('ساخته‌شده توسط nutrition-ai-coach', 48, 812)
    doc.save('nutrition-plan.pdf')
  }

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js" strategy="afterInteractive" />
      <button onClick={onMake} className="btn btn-ghost">دانلود PDF</button>
    </>
  )
}
