import * as React from 'react'
import { DefaultDialogFooter, Dialog, DialogContent } from '../dialog'
import { LinkButton } from '../lib/link-button'
import { Monospaced } from '../lib/monospaced'
import { PathText } from '../lib/path-text'

const GitLFSWebsiteURL =
  'https://help.github.com/articles/versioning-large-files/'

interface IPushingOversizedFilesProps {
  readonly oversizedFiles: ReadonlyArray<string>
  readonly onDismissed: () => void
}

/** A dialog to display a list of files that are too large to commit. */
export class PushingOversizedFiles extends React.Component<
  IPushingOversizedFilesProps
> {
  public constructor(props: IPushingOversizedFilesProps) {
    super(props)
  }

  public render() {
    return (
      <Dialog
        id="show-oversized-files"
        title={__DARWIN__ ? 'Files Too Large' : 'Files too large'}
        onDismissed={this.props.onDismissed}
        type="warning"
      >
        <DialogContent>
          <p>
            The following files are over the 100MB file limit.{' '}
            <strong>
              Files of this size can not be pushed to GitHub, and need to be
              removed in order to push.
            </strong>
          </p>
          {this.renderFileList()}
          <p className="recommendation">
            We recommend you avoid committing these files or use{' '}
            <LinkButton uri={GitLFSWebsiteURL}>Git LFS</LinkButton> to store
            large files on GitHub.
          </p>
        </DialogContent>

        <DefaultDialogFooter
          buttonText={__DARWIN__ ? 'Cancel Push' : 'Cancel push'}
          onButtonClick={this.props.onDismissed}
        />
      </Dialog>
    )
  }

  private renderFileList() {
    return (
      <div className="files-list">
        {this.props.oversizedFiles.map(fileName => (
          <ul key={fileName}>
            <Monospaced>
              <PathText path={fileName} />
            </Monospaced>
          </ul>
        ))}
      </div>
    )
  }
}
