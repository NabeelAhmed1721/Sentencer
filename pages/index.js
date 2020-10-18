import Head from 'next/head'
import { Page, Input, Button, Spacer, useToasts, Card, Progress } from '@geist-ui/react'
import styles from '../styles/Index.module.css'
import { useState } from 'react'
import * as Icon from '@geist-ui/react-icons'
import password from '../lib/password'
import lazy from '../lib/lazy'
import integrityValidate from '../lib/integrity'

export default function Index() {

  const [domain, setDomain] = useState('')
  const [domainState, setDomainState] = useState('default')

  const [sentence, setSentence] = useState('')
  const [sentenceState, setSentenceState] = useState('default')

  const [output, setOutput] = useState('')
  const [integrity, setIntegrity] = useState('')
  const [integrityRes, setIntegrityRes] = useState({})

  const [toasts, setToasts] = useToasts()

  const handleSubmit = () => {
    if(!validate()) {
      setOutput(password({
        sentence,
        domain
    }))
    }
  }

  const validate = () => {
    var errorFound = false;
    if(!sentence) {
      createError(setSentenceState, 'error')
      errorFound = true
    }
    if(!domain) {
      createError(setDomainState, 'error')
      errorFound = true
    }

    if(!sentence && !domain) {
      setToasts({type:'error', text:'Empty fields!'})
    } else if (!sentence) {
      setToasts({type:'error', text:'No sentence provided!'})
    } else if (!domain) {
      setToasts({type:'error', text:'No domain provided!'})
    }

    if(errorFound) return errorFound

    if(!validUrl(domain)) {
      createError(setDomainState, 'error')
      setToasts({type:'error', text:'Domain URL not valid!'})
      errorFound = true
    }


    return errorFound
  }

  const createError = (state, status) => {
    state(status)
    setTimeout(() => {
      state('default')
    }, 2000)
  }

  const validUrl = value => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
    return !!pattern.test(value)
  }

  const handleLazy = () => {
    setSentence(lazy())
  }

  const handleClipboard = () => {
    if(output) {
      navigator.clipboard.writeText(output).then(() => {
        setToasts({type:'success', text:'Successfully Copied!'})
      })  
    } else {
      setToasts({type:'warning', text:'Nothing to Copy!'})
    }
    
  }

  const handleCopy = () => {
    if (output) {
      setIntegrity(output)
    } else {
      setToasts({type:'warning', text:'Nothing to Copy!'})
    }
  }

  const handleIntegrity = () => {
    if (integrity) {
      setIntegrityRes(integrityValidate(integrity))
    } else {
      setToasts({type:'warning', text:'Nothing to Test!'})
    }
  }

  return (
    <Page size="mini">
      <Head>
        <title>Sentencer</title>
      </Head>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Sentencer🔏🤠</h1>
        <h4 className={styles.pageSubTitle}>Password Generator | AP Computer Science Principles</h4>
        <div className={styles.pageDesc}>Made By: Sayee and Nabeel | Oct 2020</div>
      </div>
      <div className={styles.pageBody}>
        <h3>Input: </h3>
        <Input
        onChange={evt => setDomain(evt.target.value)}
          value={domain}
          status={domainState}
          width="100%"
          placeholder="Domain name... ex. Google.com"
          className={styles.primaryInput}
        />
        <Input
          onChange={evt => setSentence(evt.target.value)}
          value={sentence}
          status={sentenceState}
          width="100%"
          placeholder="Enter short sentence here... ex. Dogs are cute"
          className={styles.input}
        />
        <div className={styles.buttonContainer}>
          <Button icon={<Icon.Upload />} onClick={handleSubmit} className={styles.primaryButton} type="default">Submit</Button>
          <Button icon={<Icon.Star />} auto onClick={handleLazy} className={styles.secondaryButton} type="secondary">I'm feeling lazy...</Button>
        </div>
        <Spacer y={3} />
        <h3>Output: </h3>
        <Input value={output} readOnly width="100%" placeholder="Result..." className={styles.primaryInput} />
        <div className={styles.buttonContainer}>
          <Button icon={<Icon.Clipboard />} auto onClick={handleClipboard} className={styles.primaryButton} type="default">Copy to Clipboard</Button>
        </div>
        <Spacer y={3} />
        <h3>Integrity Test: </h3>
        <Input
          type="password"
          value={integrity}
          onChange={evt => setIntegrity(evt.target.value)}
          width="100%"
          placeholder="Result..."
          className={styles.primaryInput}
        />
        <div className={styles.buttonContainer}>
          <Button icon={<Icon.Copy />} auto className={styles.primaryButton} onClick={handleCopy} type="default">Copy from Result</Button>
          <Button icon={<Icon.Zap />} className={styles.secondaryButton} onClick={handleIntegrity} type="secondary">Run Test</Button>
        </div>
        <Spacer y={2} />
        <Card>
          <h4>Results: </h4>
          <div>
            {integrityRes.length > 0 ?
            <div>
              <Progress value={(() => (
                integrityRes.filter(data => data.test.includes('✅'))).length * 20
              )()} colors={{
                20: '#EE0000',
                40: '#EE9700',
                60: '#e2ee00',
                80: '#7fee00',
                100: '#00eea7'
              }} />
              {
                integrityRes.map((data, key) => (
                  <p key={key}>{data.test}</p>
                ))
              }
            </div> : 'Nothing here...'}
          </div>
        </Card>
      </div>
    </Page>
  )
}