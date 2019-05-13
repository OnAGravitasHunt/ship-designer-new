export default class BBCodeExport {
  static tableCell (text = '') {
    return `{td}${text}{/td}`
  }
  static tableRow (...cells) {
    return `{tr}\n${cells.join('\n')}\n{/tr}`
  }
  static tableWrapper (...rows) {
    return `[xtable=skin1]{tbody}\n${rows.join('\n')}\n{/tbody}[/xtable]`
  }

  static summaryTable (design) {
    return this.tableWrapper(
      this.tableRow(
        this.tableCell(design.name),
        this.tableCell(`${design.weight}kt`),
        this.tableCell(['Frigate', 'Cruiser', 'Explorer'][design.design.platformGrade - 1])
      ),
      this.tableRow(
        this.tableCell(
          ['BR', 'SR']
            .map(r => `${design.stats[r.toLowerCase()]}${r}`)
            .join(' ')
        ),
        this.tableCell(
          ['O', 'EN', 'T']
            .map(c => `${c}${design.stats[c.toLowerCase()]}`)
            .join(' ')
        ),
        this.tableCell(`${design.buildTime} Years`)
      ),
      this.tableRow(
        this.tableCell(
          ['C', 'S', 'H', 'L', 'P', 'E', 'R']
            .map(s => `${s}${design.stats[s.toLowerCase()]}`)
            .join(' ')
        ),
        this.tableCell(),
        this.tableCell()
      )
    )
  }

  static moduleList (slots) {
    return this.tableWrapper(
      this.tableRow(
        this.tableCell('[b]Module[/b]'),
        this.tableCell('[b]Tech Tier[/b]')
      ),
      ...slots
        .filter(s => s.module)
        .map(s => this.tableRow(
          this.tableCell(s.module),
          this.tableCell(s.techTier)
        ))
    )
  }

  static slide (title = '', content) {
    return `{slide=${title}|center}\n${content}{/slide}`
  }

  static slidesWrapper (...slides) {
    return `[tabs=bcenter]\n${slides.join('\n')}\n[/tabs]`
  }

  static spoilerWrapper (title = '', content) {
    return `[spoiler=${title}]${content}[/spoiler]`
  }

  static export (design) {
    return this.summaryTable(design)
      + this.spoilerWrapper('Modules', this.moduleList(design.design.slots))
  }
}
