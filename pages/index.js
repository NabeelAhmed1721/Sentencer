import Head from 'next/head'
import { Page, Input, Button, Spacer, useToasts } from '@geist-ui/react'
import styles from '../styles/Index.module.css'
import { useState } from 'react'

export default function Index() {

  const [domain, setDomain] = useState('')
  const [domainState, setDomainState] = useState('default')

  const [sentence, setSentence] = useState('')
  const [sentenceState, setSentenceState] = useState('default')

  const [toasts, setToasts] = useToasts()

  const handleSubmit = () => {
    if(!validate()) {

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


    return errorFound
  }

  const createError = (state, status) => {
    state(status)
    setTimeout(() => {
      state('default')
    }, 2000)
  }

  return (
    <Page size="mini">
      <Head>
        <title>Sentencer</title>
      </Head>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Sentencer🔏🤠</h1>
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
          <Button onClick={handleSubmit} className={styles.primaryButton} type="default">Submit</Button>
          <Button className={styles.secondaryButton} type="secondary">I'm feeling lazy...</Button>
        </div>
        <Spacer y={5} />
        <h3>Input: </h3>
        <Input readOnly width="100%" placeholder="Result..." className={styles.input} />
        <div className={styles.buttonContainer}>
          <Button className={styles.primaryButton} type="default">Copy to Clipboard</Button>
        </div>
      </div>
    </Page>
  )
}