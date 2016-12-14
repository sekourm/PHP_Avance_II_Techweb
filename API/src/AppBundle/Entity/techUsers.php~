<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * techUsers
 */
class techUsers
{
    /**
     * @var int
     */
    private $id;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * @var string
     */
    private $username;

    /**
     * @var string
     */
    private $email;

    /**
     * @var string
     */
    private $password;

    /**
     * @var string
     */
    private $picture;

    /**
     * @var boolean
     */
    private $active = 0;

    /**
     * @var string
     */
    private $grade;

    /**
     * @var string
     */
    private $personalKey;

    /**
     * @var \DateTime
     */
    private $createdAt;

    /**
     * @var \DateTime
     */
    private $updatedAt;


    /**
     * Set username
     *
     * @param string $username
     * @return techUsers
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string 
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return techUsers
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return techUsers
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string 
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set picture
     *
     * @param string $picture
     * @return techUsers
     */
    public function setPicture($picture)
    {
        $this->picture = $picture;

        return $this;
    }

    /**
     * Get picture
     *
     * @return string 
     */
    public function getPicture()
    {
        return $this->picture;
    }

    /**
     * Set active
     *
     * @param boolean $active
     * @return techUsers
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Get active
     *
     * @return boolean 
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set grade
     *
     * @param string $grade
     * @return techUsers
     */
    public function setGrade($grade)
    {
        $this->grade = $grade;

        return $this;
    }

    /**
     * Get grade
     *
     * @return string 
     */
    public function getGrade()
    {
        return $this->grade;
    }

    /**
     * Set personalKey
     *
     * @param string $personalKey
     * @return techUsers
     */
    public function setPersonalKey($personalKey)
    {
        $this->personalKey = $personalKey;

        return $this;
    }

    /**
     * Get personalKey
     *
     * @return string 
     */
    public function getPersonalKey()
    {
        return $this->personalKey;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return techUsers
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     * @return techUsers
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime 
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $usersProjects;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->usersProjects = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add usersProjects
     *
     * @param \AppBundle\Entity\techProjects $usersProjects
     * @return techUsers
     */
    public function addUsersProject(\AppBundle\Entity\techProjects $usersProjects)
    {
        $this->usersProjects[] = $usersProjects;

        return $this;
    }

    /**
     * Remove usersProjects
     *
     * @param \AppBundle\Entity\techProjects $usersProjects
     */
    public function removeUsersProject(\AppBundle\Entity\techProjects $usersProjects)
    {
        $this->usersProjects->removeElement($usersProjects);
    }

    /**
     * Get usersProjects
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getUsersProjects()
    {
        return $this->usersProjects;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $projectsByUsers;


    /**
     * Add projectsByUsers
     *
     * @param \AppBundle\Entity\techProjectsByUsers $projectsByUsers
     * @return techUsers
     */
    public function addProjectsByUser(\AppBundle\Entity\techProjectsByUsers $projectsByUsers)
    {
        $this->projectsByUsers[] = $projectsByUsers;

        return $this;
    }

    /**
     * Remove projectsByUsers
     *
     * @param \AppBundle\Entity\techProjectsByUsers $projectsByUsers
     */
    public function removeProjectsByUser(\AppBundle\Entity\techProjectsByUsers $projectsByUsers)
    {
        $this->projectsByUsers->removeElement($projectsByUsers);
    }

    /**
     * Get projectsByUsers
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getProjectsByUsers()
    {
        return $this->projectsByUsers;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $subTasksByUsers;


    /**
     * Add subTasksByUsers
     *
     * @param \AppBundle\Entity\techSubTasksByUsers $subTasksByUsers
     * @return techUsers
     */
    public function addSubTasksByUser(\AppBundle\Entity\techSubTasksByUsers $subTasksByUsers)
    {
        $this->subTasksByUsers[] = $subTasksByUsers;

        return $this;
    }

    /**
     * Remove subTasksByUsers
     *
     * @param \AppBundle\Entity\techSubTasksByUsers $subTasksByUsers
     */
    public function removeSubTasksByUser(\AppBundle\Entity\techSubTasksByUsers $subTasksByUsers)
    {
        $this->subTasksByUsers->removeElement($subTasksByUsers);
    }

    /**
     * Get subTasksByUsers
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getSubTasksByUsers()
    {
        return $this->subTasksByUsers;
    }

    public function insertCreatedAtAuto()
    {
        return $this->setCreatedAt(new \DateTime());
    }

    public function insertUpdateAtAuto()
    {
        return $this->setUpdatedAt(new \DateTime());
    }
}
